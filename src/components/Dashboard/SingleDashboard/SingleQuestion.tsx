import { FC, useState } from "react";

import { Question } from "@prisma/client";

interface SingleQuestion {
  question: { question: Question };
  index: number;
}

const SingleQuestion: FC<SingleQuestion> = ({
  question: { question },
  index,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  return (
    <div className="border px-5 py-8 rounded-md">
      <h2 className="font-bold text-xl ml-2">
        {index + 1}. {question.question}
      </h2>

      <div className="mt-4 space-y-3">
        {question.mcqAnswers.map((item, index) => (
          <h3
            key={index}
            className={`border px-4 py-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
              selectedAnswer == index && "bg-gray-100"
            }`}
            onClick={() => {
              setSelectedAnswer(index);
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
