import { Question } from "@prisma/client";
import { create } from "zustand";

interface useQuestionsStore {
  bookId: string;
  questions: Question[];
  replaceQuestions: (bookId: string, questions: Question[]) => void;
  addNewQuestions: (bookId: string, questions: Question[]) => void;
}

const useQuestionStore = create<useQuestionsStore>((set) => ({
  bookId: "",
  questions: [],
  replaceQuestions: (bookId, questions) =>
    set((_) => ({
      bookId,
      questions,
    })),
  addNewQuestions: (bookId, questions) => {
    console.log(questions);
    console.log("break");

    set((state) => ({
      questions: [...state.questions, ...questions],
      bookId,
    }));
  },
}));

export default useQuestionStore;
