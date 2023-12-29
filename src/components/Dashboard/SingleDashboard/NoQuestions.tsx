import { CiFolderOn } from "react-icons/ci";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const NoQuestions = () => {
  return (
    <Card className="w-full flex flex-col justify-center items-center mt-16 py-16">
      <CiFolderOn className="text-6xl text-gray-600" />
      <h4 className="mt-6 text-xl font-medium capitalize">
        No Questions are created
      </h4>
      <div className="mt-1 text-gray-600">
        To start generating questions, select a page by clicking the{" "}
        <Badge variant="secondary" className="mx-1">
          Select Page
        </Badge>{" "}
        button
      </div>
    </Card>
  );
};

export default NoQuestions;
