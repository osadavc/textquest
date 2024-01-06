import { Question } from "@prisma/client";
import { create } from "zustand";

interface useQuestionsStore {
  bookId: string;
  questions: Question[];
  replaceQuestions: (bookId: string, questions: Question[]) => void;
  addNewQuestions: (bookId: string, questions: Question[]) => void;
  updateAnswers: (updatedQuestions: Question[]) => void;
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
    set((state) => ({
      questions: [...state.questions, ...questions],
      bookId,
    }));
  },
  updateAnswers: (updatedQuestions) => {
    set((state) => ({
      questions: state.questions.map((item) => {
        const updatedQuestion = updatedQuestions.find(
          (updatedQuestionId) => updatedQuestionId.id === item.id,
        );

        return updatedQuestion ?? item;
      }),
    }));
  },
}));

export default useQuestionStore;
