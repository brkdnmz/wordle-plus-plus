import { getWordType } from "@/local-storage";
import { reactive } from "vue";
import type { LocalStore } from "./types";
import { wordleStore } from "./wordle-store";

export const localStore = reactive<LocalStore>({
  wordType: getWordType(),

  setWordType(wordType) {
    this.wordType = wordType;
    localStorage.setItem("wordType", wordType);
    wordleStore.updateTargetWord(wordType);
  },
});
