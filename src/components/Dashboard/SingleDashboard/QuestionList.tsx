import { FC } from "react";

import { Question } from "@prisma/client";

import SingleQuestion from "@/components/Dashboard/SingleDashboard/SingleQuestion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface QuestionList {
  displayedQuestions: QuestionListExp;
}

interface QuestionListExp {
  [pageNumber: number]: Question[];
}

const QuestionList: FC<QuestionList> = ({ displayedQuestions }) => {
  return (
    <Accordion
      type="multiple"
      className="space-y-6 my-10"
      defaultValue={[Object.keys(displayedQuestions)[0]]}
    >
      {Object.keys(displayedQuestions).map((page: string) => (
        <AccordionItem value={page} key={page}>
          <AccordionTrigger className="flex" completed={false}>
            <h3 className="font-semibold text-xl">Page {page}</h3>
          </AccordionTrigger>

          <AccordionContent>
            <div className="space-y-6 mt-2">
              {displayedQuestions[parseInt(page.toString())].map(
                (item: any) => (
                  <SingleQuestion
                    key={item.index}
                    question={item}
                    index={item.index}
                  />
                ),
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default QuestionList;
