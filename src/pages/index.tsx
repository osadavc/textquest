import Header from "@/components/Common/Header";
import HeroSection from "@/components/Home/HeroSection";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { NextPage } from "next";

interface HomeProps {
  isLoggedIn: boolean;
}

const Home: NextPage<HomeProps> = ({ isLoggedIn }) => {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} />
      <HeroSection />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  return {
    props: {
      isLoggedIn: session?.id,
    },
  };
};

export default Home;
