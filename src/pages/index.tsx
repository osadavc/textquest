import { GetServerSideProps } from "next";
import { NextPage } from "next";

import { getSession } from "next-auth/react";

import Header from "@/components/Common/Header";
import HeroSection from "@/components/Home/HeroSection";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: NextPage<HomeProps> = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <HeroSection isLoggedIn={isLoggedIn} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      isLoggedIn: !!session?.id,
    },
  };
};

export default Home;
