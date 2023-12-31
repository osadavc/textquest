import { NextApiResponse } from "next";

import { createRouter } from "next-connect";

import {
  auth,
  onError,
  onNoMatch,
  NextApiRequestWithUser,
} from "@/utils/apiUtils";
import * as pdf from "@/utils/pdfUtils";
import prisma from "@/utils/prisma";

const router = createRouter<NextApiRequestWithUser, NextApiResponse>();

router.use(auth);

router.post(async (req, res) => {
  const { questionType, numberOfQuestions, bookId, pageNumber } = req.body;

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

  res.send({});
});

export default router.handler({
  onError,
  onNoMatch,
});
