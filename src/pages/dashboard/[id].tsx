import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";

import { Textbook } from "@prisma/client";
import { getSession } from "next-auth/react";
import { IoIosArrowRoundBack } from "react-icons/io";

import Header from "@/components/Common/Header";
import NoQuestions from "@/components/Dashboard/SingleDashboard/NoQuestions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import prisma from "@/utils/prisma";

interface SingleDashboardPage {
  textbook: Textbook;
}

const TextbookPreview = dynamic(
  () => import("@/components/Dashboard/SingleDashboard/TextbookPreview"),
  {
    ssr: false,
  },
);

const SingleDashboardPage: NextPage<SingleDashboardPage> = ({ textbook }) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div>
      <Header isDashboard isLoggedIn />

      <div className="px-3 max-w-7xl mx-auto">
        <button
          className="flex items-center hover:text-customPrimary transition-colors"
          onClick={router.back}
        >
          <IoIosArrowRoundBack className="text-xl" />{" "}
          <span className="ml-1">Back</span>
        </button>

        <h3 className="font-bold text-2xl mt-5">{textbook.name}</h3>
        {/* TODO: Fix the page count */}
        {/* <p className="mt-2 text-lg">69 Pages</p> */}

        <Sheet>
          <SheetTrigger asChild>
            <Button className="mt-3" variant="secondary">
              Select Page
            </Button>
          </SheetTrigger>

          <SheetContent className="min-w-[500px]">
            <SheetHeader>
              <SheetTitle className="font-bold text-2xl">
                Select a Page
              </SheetTitle>
              <SheetDescription>
                Select a specific page from the uploaded PDF document to
                generate questions
              </SheetDescription>
            </SheetHeader>

            <TextbookPreview
              fileURL={textbook.fileURL}
              // pageCount={pageCount}
              pageNumber={pageNumber}
              // setPageCount={setPageCount}
              setPageNumber={setPageNumber}
            />
          </SheetContent>
        </Sheet>

        <NoQuestions />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  const { id } = ctx.params! as {
    id: string;
  };

  if (typeof id != "string") {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard",
      },
    };
  }

  const textbook = await prisma.textbook.findUnique({
    where: {
      id,
    },
  });

  return {
    props: {
      session: session,
      textbook,
    },
  };
};

export default SingleDashboardPage;
