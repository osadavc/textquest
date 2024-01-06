import { FC } from "react";

import { Question } from "@prisma/client";

interface SingleQuestion {
  question: { question: Question };
  selectAnswer: (questions: string, answer: number) => void;
  pageAnswers: {
    [questionId: string]: number;
  };
}

const SingleQuestion: FC<SingleQuestion> = ({
  question: { question },
  selectAnswer,
  pageAnswers,
}) => {
  return (
    <div className="border px-5 py-8 rounded-md">
      <h2 className="font-bold text-xl ml-2">{question.question}</h2>

      <div className="mt-4 space-y-3">
        {question.mcqAnswers.map((item, index) => {
          const selectedCorrectAnswer =
            question.correctMCQAnswerIndex === index &&
            question.userMCQAnswerIndex != null;

          const locallySelectedAnswer = pageAnswers[question.id] === index;

          const wrongAnswer =
            question.correctMCQAnswerIndex != question.userMCQAnswerIndex &&
            index == question.userMCQAnswerIndex;

          return (
            <h3
              key={index}
              className={`border px-4 py-4 rounded-md ${
                question.userMCQAnswerIndex == null &&
                "hover:bg-gray-100 cursor-pointer"
              } transition-colors ${locallySelectedAnswer && "bg-gray-100"} ${
                selectedCorrectAnswer && "border-2 border-green-400"
              } ${wrongAnswer && "border-2 border-red-400"}`}
              onClick={() => {
                if (question.userMCQAnswerIndex == null) {
                  selectAnswer(question.id, index);
                }
              }}
            >
              {item}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

export default SingleQuestion;
