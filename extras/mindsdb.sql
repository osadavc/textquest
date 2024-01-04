CREATE ML_ENGINE openai_engine
FROM openai
USING
    api_key = 'YOUR_API_KEY';



DROP MODEL mindsdb.question_generator;

CREATE MODEL mindsdb.question_generator
PREDICT questions
USING
    engine = 'openai_engine',
    model_name = 'gpt-3.5-turbo',
    prompt_template = 'Answer in JSON (json array named questions with each object having question, 4 answers and the actual answer. The key of actual answer should be "correct_answer"). Generate {{question_amount}} {{question_type}} questions (all the answers in mcq questions should be full) from the following text. \n\n {{page_content}}. Ask questions other than {{ignore_questions}}. Only ask questions which are answerable by the given text',
    max_tokens=1000;