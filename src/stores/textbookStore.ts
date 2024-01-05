import { Question, Textbook } from "@prisma/client";
import { create } from "zustand";

type TextbooksWithQuestions = (Textbook & {
  questions: Question[];
})[];

type TextbookWithQuestions = Textbook & {
  questions: Question[];
};

interface useTextbookStore {
  textbooks: TextbooksWithQuestions;
  addNewTextbook: (textbook: TextbookWithQuestions) => void;
  replaceTextbooks: (textbooks: TextbooksWithQuestions) => void;
}

const useTextbookStore = create<useTextbookStore>((set) => ({
  textbooks: [],
  addNewTextbook: (textbook) =>
    set((state) => ({
      textbooks: [...state.textbooks, textbook],
    })),
  replaceTextbooks: (textbooks) =>
    set((_) => ({
      textbooks: textbooks,
    })),
}));

export default useTextbookStore;
