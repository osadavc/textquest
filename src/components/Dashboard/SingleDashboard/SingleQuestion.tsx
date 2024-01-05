import { FC, useState } from "react";

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
        {question.mcqAnswers.map((item, index) => (
          <h3
            key={index}
            className={`border px-4 py-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
              pageAnswers[question.id] === index && "bg-gray-100"
            }`}
            onClick={() => {
              selectAnswer(question.id, index);
            }}
          >
            {item}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default SingleQuestion;
