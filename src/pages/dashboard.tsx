import Header from "@/components/Common/Header";
import NoTextbooks from "@/components/Dashboard/NoTextbooks";
import TopBar from "@/components/Dashboard/TopBar";
import prisma from "@/utils/prisma";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  return (
    <div>
      <Header isLoggedIn={true} isDashboard={true} />

      <div className="mt-5 max-w-7xl mx-auto h-full">
        <TopBar />
        <NoTextbooks />
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
  });

  return {
    props: {
      session: session,
      user,
    },
  };
};

export default Dashboard;
