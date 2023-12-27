import { Button } from "@/components/ui/button";
import { CiInboxOut } from "react-icons/ci";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="font-bold text-2xl">Uploaded Textbooks</h3>

      <Button
        variant="ghost"
        className="bg-customPrimary text-white hover:bg-customPrimary hover:text-white"
      >
        <CiInboxOut className="text-2xl" />{" "}
        <span className="ml-3">Upload a New Textbook</span>
      </Button>
    </div>
  );
};

export default TopBar;
