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
  const { name, fileURL } = req.body;

  const result = await prisma.textbook.create({
    data: {
      fileURL,
      name,
      User: {
        connect: {
          id: req.userId,
        },
      },
    },
  });

  res.json({
    message: "Textbook Uploaded",
    data: result,
  });
});

export default router.handler({
  onError,
  onNoMatch,
});
