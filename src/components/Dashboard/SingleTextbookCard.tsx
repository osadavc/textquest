import Link from "next/link";
import { FC } from "react";

import { Question, Textbook } from "@prisma/client";

import { Card } from "@/components/ui/card";

interface SingleTextbookCard {
  item: Textbook & {
    questions: Question[];
  };
}

const SingleTextbookCard: FC<SingleTextbookCard> = ({ item }) => {
  return (
    <Link href={`/dashboard/${item.id}`}>
      <Card className="cursor-pointer p-5 transition-shadow hover:shadow-md h-full">
        <h4 className="break-words text-xl font-bold">{item.name}</h4>
        <p className="mt-3">{item.questions.length} Questions</p>
      </Card>
    </Link>
  );
};

export default SingleTextbookCard;
