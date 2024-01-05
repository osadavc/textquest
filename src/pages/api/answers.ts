import { NextApiResponse } from "next";

import { createRouter } from "next-connect";

import {
  auth,
  onError,
  onNoMatch,
  NextApiRequestWithUser,
} from "@/utils/apiUtils";
import prisma from "@/utils/prisma";

const router = createRouter<NextApiRequestWithUser, NextApiResponse>();

router.use(auth);

router.post(async (req, res) => {
  const { pageAnswers } = req.body as {
    pageAnswers: {
      [questionId: string]: number;
    };
  };

  const questionIdList = Object.keys(pageAnswers);

  const result = await prisma.$transaction(
    questionIdList.map((item) =>
      prisma.question.update({
        where: {
          id: item,
        },
        data: {
          userMCQAnswerIndex: pageAnswers[item],
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
