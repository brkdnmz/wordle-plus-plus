import type { LetterStatus, WordType } from "@/types";

export type LocalStore = {
  wordType: WordType;

  setWordType: (wordType: WordType) => void;
};

export type WordleStore = {
  gameStarted: boolean;
  wordsByLength: string[][];
  targetWord: string;
  grid: {
    rows: number;
    cols: number;
    currentRow: number;
  };
  guesses: {
    word: string;
    status?: LetterStatus[];
  }[];
  canWrite: boolean; // For disabling writing after entering a guess

  startGame: () => void;
  setRows: (newRows: number) => void;
  setCols: (newCols: number) => void;
  updateTargetWord: (wordType: WordType) => void;
  onKeyPress: (key: string) => void;
  setCanWrite: (canWrite: boolean) => void;
};
