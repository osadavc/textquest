import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto flex py-10 justify-between items-center">
      <div className="flex items-center">
        <img src="/favicon.png" alt="TextQuest Logo" className="w-16" />
        <h1 className="font-black text-3xl ml-5">TextQuest</h1>
      </div>

      <div>
        <Button variant="outline">Test Your Knowledge</Button>
      </div>
    </div>
  );
};

export default Header;
