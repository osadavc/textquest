import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextPage } from "next";
import { Textbook } from "@prisma/client";
import Header from "@/components/Common/Header";
import dynamic from "next/dynamic";
import NoQuestions from "@/components/Dashboard/SingleDashboard/NoQuestions";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/router";

interface SingleDashboardPage {
  textbook: Textbook;
}

const TextbookPreview = dynamic(
  () => import("@/components/Dashboard/SingleDashboard/TextbookPreview"),
  {
    ssr: false,
  }
);

const SingleDashboardPage: NextPage<SingleDashboardPage> = ({ textbook }) => {
  const router = useRouter();

  return (
    <div>
      <Header isDashboard isLoggedIn />
      {/* <TextbookPreview fileURL={textbook.fileURL} /> */}

      <div className="px-3 max-w-7xl mx-auto">
        <button
          className="flex items-center hover:text-customPrimary transition-colors"
          onClick={router.back}
        >
          <IoIosArrowRoundBack className="text-xl" />{" "}
          <span className="ml-1">Back</span>
        </button>

        <h3 className="font-bold text-2xl mt-5">{textbook.name}</h3>
        <p className="mt-2 text-lg">69 Pages</p>

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
