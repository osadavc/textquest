import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const GenerateQuestion = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  // Placeholder for now
  const [questionType, setQuestionType] = useState("mcq");

  return (
    <Card className="w-full flex flex-col items-center mt-16 p-8">
      <h3 className="font-bold text-xl">Generate Questions</h3>

      <div className="flex flex-col mt-10 w-full">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={["question-options"]}
        >
          <AccordionItem value="question-options">
            <AccordionTrigger className="font-bold">
              Question Options
            </AccordionTrigger>
            <AccordionContent className="mt-5 px-0">
              <p className="mb-3">
                Number of Questions (Maximum questions per generation is 10)
              </p>
              <div className="flex space-x-3">
                <Input
                  type="number"
                  max={10}
                  value={numberOfQuestions}
                  onChange={(e) => {
                    setNumberOfQuestions(parseInt(e.currentTarget.value));
                  }}
                  disabled
                  className="disabled:cursor-default disabled:opacity-100"
                />
                <Button
                  onClick={() => {
                    if (numberOfQuestions - 1 >= 1) {
                      setNumberOfQuestions((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Button
                  onClick={() => {
                    if (numberOfQuestions + 1 <= 10) {
                      setNumberOfQuestions((prev) => prev + 1);
                    }
                  }}
                >
                  +
                </Button>
              </div>

              <p className="mb-3 mt-8">Choose Question Type</p>
              <ToggleGroup type="multiple" defaultValue={["mcq"]}>
                <ToggleGroupItem
                  value="mcq"
                  disabled
                  className="disabled:opacity-100"
                >
                  MCQ
                </ToggleGroupItem>
                <ToggleGroupItem value="saq" disabled variant="outline">
                  Short Answer Questions
                </ToggleGroupItem>
                <ToggleGroupItem value="laq" disabled variant="outline">
                  Long Answer Questions
                </ToggleGroupItem>
              </ToggleGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="exceptions" className="mt-5">
            <AccordionTrigger className="font-bold">
              Exceptions from the text
            </AccordionTrigger>
            <AccordionContent className="mt-5">
              <p>
                If certain textbook sections should be omitted from question
                creation, please select them.
              </p>


              
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="mt-8 w-min px-8">Generate</Button>
      </div>
    </Card>
  );
};

export default GenerateQuestion;
