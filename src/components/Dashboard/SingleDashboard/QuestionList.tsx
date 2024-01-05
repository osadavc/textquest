import { FC, useMemo, useState } from "react";

import { Question } from "@prisma/client";
import axios from "axios";

import SingleQuestion from "@/components/Dashboard/SingleDashboard/SingleQuestion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
        <SinglePageQuestions
          key={page}
          page={page}
          displayedQuestions={displayedQuestions}
        />
      ))}
    </Accordion>
  );
};

interface SinglePageQuestions {
  page: string;
  displayedQuestions: QuestionListExp;
}

const SinglePageQuestions: FC<SinglePageQuestions> = ({
  page,
  displayedQuestions,
}) => {
  const [pageAnswers, setPageAnswers] = useState<{
    [questionId: string]: number;
  }>({});

  const selectAnswer = (question: string, answer: number) => {
    setPageAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const unAnsweredQuestions = useMemo(
    () =>
      displayedQuestions[parseInt(page.toString())].filter(
        (item) => !item.userMCQAnswerIndex,
      ).length,
    [displayedQuestions, page],
  );

  const checkAnswers = async () => {
    const { data } = await axios.post("/api/answers", {
      pageAnswers,
    });

    console.log(data);
  };

  return (
    <AccordionItem value={page}>
      <AccordionTrigger className="flex">
        <div className="flex">
          <h3 className="font-semibold text-xl">Page {page}</h3>

          {unAnsweredQuestions === 0 && (
            <Badge variant="default" className="mx-3 bg-green-500">
              Completed
            </Badge>
          )}
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <div className="space-y-6 mt-2">
          {displayedQuestions[parseInt(page.toString())].map((item: any) => (
            <SingleQuestion
              key={item.index}
              question={item}
              selectAnswer={selectAnswer}
              pageAnswers={pageAnswers}
            />
          ))}

          {unAnsweredQuestions === Object.values(pageAnswers).length && (
            <Button variant="outline" className="mb-4" onClick={checkAnswers}>
              Check Answers
            </Button>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default QuestionList;
