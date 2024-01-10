import { useRouter } from "next/router";
import { FC } from "react";

import { signIn } from "next-auth/react";

import { Button } from "../ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center h-full pt-28 flex-col">
      <img src="/favicon.png" alt="TextQuest Logo" className="w-36" />
      <h1 className="font-black text-6xl mt-10">
        Text<span className="text-customPrimary">Quest</span>
      </h1>
      <p className="text-xl mt-5 text-center">
        Test your knowledge in three simple steps. <br /> Generate, Answer,
        Correct. Simple !
      </p>

      <Button
        variant="ghost"
        className="bg-customPrimary text-white hover:bg-customPrimary hover:text-white mt-6 px-6 py-5"
        onClick={() => {
          if (isLoggedIn) {
            router.push("/dashboard");
          } else {
            signIn("google", {
              callbackUrl: "/dashboard",
            });
          }
        }}
      >
        Go to Dashboard
      </Button>

      <video controls={false} className="border my-16 rounded-md" autoPlay loop>
        <source src="/videos/demo.mp4" type="video/mp4" />
        Your browser does not support the videos
      </video>
    </div>
  );
};

export default HeroSection;
