import Header from "@/components/Common/Header";
import NoTextbooks from "@/components/Dashboard/NoTextbooks";
import TopBar from "@/components/Dashboard/TopBar";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextPage } from "next";
import { Textbook } from "@prisma/client";
import { useEffect } from "react";
import useTextbookStore from "@/stores/textbookStore";
import SingleTextbookCard from "@/components/Dashboard/SingleTextbookCard";

interface Dashboard {
  user: {
    textbooks: Textbook[];
  };
}

const Dashboard: NextPage<Dashboard> = ({ user: { textbooks } }) => {
  const { replaceTextbooks, textbooks: storedTextbooks } = useTextbookStore();

  useEffect(() => {
    replaceTextbooks(textbooks);
  }, [replaceTextbooks, textbooks]);

  return (
    <div>
      <Header isLoggedIn={true} isDashboard={true} />

      <div className="mt-5 max-w-7xl mx-auto h-full">
        <TopBar />

        {storedTextbooks.length < 1 ? (
          <NoTextbooks />
        ) : (
          <div className="px-3 mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {storedTextbooks.map((item) => (
              <SingleTextbookCard key={item.id} item={item} />
            ))}
          </div>
        )}
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

  const user = await prisma.user.findUnique({
    where: {
      id: session.id,
    },
    include: {
      textbooks: true,
    },
  });

  return {
    props: {
      session: session,
      user,
    },
  };
};

export default Dashboard;
