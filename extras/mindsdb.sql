CREATE ML_ENGINE openai_engine
FROM openai
USING
    api_key = 'OPENAI_API_KEY';

DROP MODEL mindsdb.question_generator;

CREATE MODEL mindsdb.question_generator
PREDICT questions
USING
    engine = 'openai_engine',
    model_name = 'gpt-3.5-turbo',
    prompt_template = 'Answer in JSON (json array named questions with each object having question, 4 answers and the actual answer. The key of actual answer should be "correct_answer"). All the questions SHOULD only have ONE CORRECT answer. Generate {{question_amount}} {{question_type}} questions (all the answers in mcq questions should be full) from the following text. IGNORE the sections {{exceptions}}. \n\n {{page_content}}. Ask questions other than {{ignore_questions}}. Only ask questions which are answerable by the given text',
    max_tokens=3000;


-- Slack Bot


CREATE DATABASE mindsdb_slack
WITH
  ENGINE = 'slack',
  PARAMETERS = {
      "token": "SLACK_OAUTH_TOKEN"
    };

SELECT * FROM mindsdb_slack.channels WHERE channel='general';

CREATE MODEL mindsdb.slack_question_generator
PREDICT response
USING
    engine = 'openai_engine',
    model_name = 'gpt-3.5-turbo',
    prompt_template = 'Generate 5 MCQ Questions from the below text. Each question must have 4 choices and the correct answer. The correct answer list should be included at the end. Only ask questions which are answerable by the given text \n\n {{text}}',
    max_tokens=3000;


CREATE JOB mindsdb.slack_question_generator_bot AS (
  INSERT INTO mindsdb_slack.channels(channel, text)
    SELECT
        t.channel as channel,
        t.text as input_text, 
        r.response as text
    FROM mindsdb_slack.channels as t
    JOIN mindsdb.slack_question_generator as r
    WHERE t.channel = 'general' AND t.created_at > "2023-07-25 05:22:00" AND t.created_at > "{{PREVIOUS_START_DATETIME}}"
    LIMIT 1;
)
EVERY minute;




