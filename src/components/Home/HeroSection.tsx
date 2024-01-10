import { useRouter } from "next/router";
import { FC, useRef, useState } from "react";

import { signIn } from "next-auth/react";
import { FaP, FaPlay } from "react-icons/fa6";

import { Button } from "../ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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

      <div className="my-16 relative aspect-video w-full">
        <video
          controls={false}
          className="border absolute left-0 top-0 w-full h-full rounded-md"
          ref={videoRef}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.pause();
              setPlaying(false);
            }
          }}
        >
          <source src="/videos/demo.mp4" type="video/mp4" />
          Your browser does not support the videos
        </video>

        {!playing && (
          <div className="bg-customPrimary/20 absolute left-0 top-0 w-full h-full rounded-md z-10 flex justify-center items-center">
            <FaPlay
              className="cursor-pointer w-full h-[18%] text-blue-600"
              onClick={() => {
                setPlaying(true);
                videoRef.current?.play();
              }}
            />
          </div>
        )}
      </div>

      <p className="my-16">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/osadavc"
          target="_blank"
          className="text-blue-600 font-bold"
        >
          Osada Vidath
        </a>{" "}
        for Hashnode X Mindsdb Hackathon
      </p>
    </div>
  );
};

export default HeroSection;
