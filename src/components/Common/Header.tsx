import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FC } from "react";
import { useRouter } from "next/router";

interface HomeProps {
  isLoggedIn: boolean;
}

const Header: FC<HomeProps> = ({ isLoggedIn }) => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto flex py-10 justify-between items-center">
      <div className="flex items-center">
        <img src="/favicon.png" alt="TextQuest Logo" className="w-16" />
        <h1 className="font-black text-3xl ml-5">TextQuest</h1>
      </div>

      <div>
        <Button
          variant="outline"
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
          Test Your Knowledge
        </Button>
      </div>
    </div>
  );
};

export default Header;
