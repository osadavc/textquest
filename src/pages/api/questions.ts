import { NextApiResponse } from "next";

import { QuestionType } from "@prisma/client";
import MindsDB from "mindsdb-js-sdk";
import { createRouter } from "next-connect";

import {
  auth,
  onError,
  onNoMatch,
  NextApiRequestWithUser,
} from "@/utils/apiUtils";
import shuffleArray from "@/utils/arrayUtils";
import mindsdbConnect from "@/utils/mindsdb";
import * as pdf from "@/utils/pdfUtils";
import prisma from "@/utils/prisma";

const router = createRouter<NextApiRequestWithUser, NextApiResponse>();

router.use(auth);

interface QuestionItem {
  question: string;
  answers: string[];
  correct_answer: string;
}

router.post(async (req, res) => {
  const { questionType, numberOfQuestions, bookId, pageNumber } = req.body;

  if (numberOfQuestions > 10 || numberOfQuestions < 2) {
    throw new Error("Question amount is invalid or not supported yet");
  }

  if (questionType != "mcq") {
    throw new Error("Question type is not supported yet");
  }

  const textbook = await prisma.textbook.findUnique({
    where: {
      id: bookId,
    },
    select: {
      fileURL: true,
    },
  });

  if (!textbook) {
    throw new Error("No textbook found");
  }

  const pageContent = await pdf.getText(textbook.fileURL, pageNumber);

  await mindsdbConnect();
  const model = await MindsDB.Models.getModel("question_generator", "mindsdb");

  const queryOptions = {
    where: [
      `page_content = "${pageContent}"`,
      `question_amount = "${numberOfQuestions}"`,
      `question_type = "${questionType}"`,
    ],
  };

  const questions = JSON.parse(
    (await model?.query(queryOptions))?.value.toString() ?? "",
  ).questions.map((item: QuestionItem) => ({
    ...item,
    answers: shuffleArray(item.answers),
  }));

  console.log(questions);

  const result = await prisma.$transaction(
    questions.map((item: QuestionItem) =>
      prisma.question.create({
        data: {
          questionType: QuestionType.MCQ,
          question: item.question,
          mcqAnswers: item.answers,
          correctMCQAnswerIndex: item.answers.findIndex(
            (answer) => answer == item.correct_answer,
          ),
          textbookId: bookId,
          pageNumber,
        },
      }),
    ),
  );

  res.send({
    response: result,
  });
});

export default router.handler({
  onError,
  onNoMatch,
});
