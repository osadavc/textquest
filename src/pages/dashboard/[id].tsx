import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextPage } from "next";
import { Textbook } from "@prisma/client";
import Header from "@/components/Common/Header";

interface SingleDashboardPage {
  textbook: Textbook;
}

const SingleDashboardPage: NextPage<SingleDashboardPage> = ({ textbook }) => {
  return (
    <div>
      <Header isDashboard isLoggedIn />

      {JSON.stringify(textbook)}
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
