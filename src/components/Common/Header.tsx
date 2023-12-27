import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/router";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

interface HomeProps {
  isLoggedIn: boolean;
  isDashboard?: boolean;
}

const Header: FC<HomeProps> = ({ isLoggedIn, isDashboard }) => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto flex py-10 justify-between items-center">
      <div className="flex items-center">
        <Link href="/">
          <img src="/favicon.png" alt="TextQuest Logo" className="w-16" />
        </Link>
        {!isDashboard && (
          <h1 className="font-black text-3xl ml-5">
            Text<span className="text-customPrimary">Quest</span>
          </h1>
        )}
      </div>

      <div>
        {isDashboard ? (
          <Button
            variant="ghost"
            onClick={() => {
              signOut({
                callbackUrl: "/",
              });
            }}
          >
            <CiLogout className="text-xl" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="bg-customPrimary text-white hover:bg-customPrimary hover:text-white"
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
            Let&apos;s Go
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
