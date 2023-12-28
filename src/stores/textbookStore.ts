import { Textbook } from "@prisma/client";
import { create } from "zustand";

interface useTextbookStore {
  textbooks: Textbook[];
  addNewTextbook: (textbook: Textbook) => void;
  replaceTextbooks: (textbooks: Textbook[]) => void;
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
