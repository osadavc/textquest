import { Textbook } from "@prisma/client";
import { FC } from "react";

import { Card } from "@/components/ui/card";

interface SingleTextbookCard {
  item: Textbook;
}

const SingleTextbookCard: FC<SingleTextbookCard> = ({ item }) => {
  return (
    <Card className="p-5 cursor-pointer hover:shadow-md transition-shadow">
      <h4 className="font-bold text-xl break-words">{item.name}</h4>
      <p className="mt-3">Answered 0 / 0 MCQ Questions</p>
    </Card>
  );
};

export default SingleTextbookCard;
