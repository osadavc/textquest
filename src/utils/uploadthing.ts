import { getToken } from "next-auth/jwt";

import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req, res: _ }) => {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token?.id) throw new Error("Unauthorized");

      return { userId: token.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
