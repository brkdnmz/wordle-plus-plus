import { getRandomWord, getTodaysWord, WORDS_BY_LENGTH_MAP } from "@/data";
import { getWordType } from "@/local-storage";
import { WordType } from "@/types";
import { compare, isTurkishLetter } from "@/util";
import { reactive } from "vue";
import { DEFAULT_COLS, DEFAULT_ROWS } from "./constants";
import type { WordleStore } from "./types";

export const wordleStore = reactive<WordleStore>({
  gameStarted: false,
  grid: {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    currentRow: 0,
  },
  guesses: [],
  wordsByLength: WORDS_BY_LENGTH_MAP,
  targetWord: (getWordType() === WordType.TODAYS_WORD
    ? getTodaysWord
    : getRandomWord)(DEFAULT_COLS),

  startGame() {
    this.gameStarted = true;
  },
  setRows(newRows) {
    this.grid.rows = newRows;
  },
  setCols(newCols) {
    this.grid.cols = newCols;
    this.grid.rows = Math.min(
      this.grid.rows,
      this.wordsByLength[this.grid.cols].length,
    );
    this.targetWord = getTodaysWord(newCols);
  },
  updateTargetWord(wordType) {
    const wordLength = this.grid.cols;
    this.targetWord =
      wordType === WordType.TODAYS_WORD
        ? getTodaysWord(wordLength)
        : getRandomWord(wordLength);
  },
  onKeyPress(key) {
    const { grid, guesses } = this;
    const { currentRow } = grid;

    if (guesses.length <= currentRow) guesses.push({ word: "" });

    const currentGuess = guesses[currentRow];

    switch (key) {
      case "Backspace":
        currentGuess.word = currentGuess.word.slice(0, -1);
        break;
      case "Enter":
        if (currentGuess.word.length < grid.cols) {
          alert("Kelime tam değil");
          break;
        }

        if (
          !this.wordsByLength[grid.cols].includes(
            currentGuess.word.toLocaleLowerCase("tr"),
          )
        ) {
          alert("Kelime bulunamadı");
          break;
        }

        currentGuess.status = compare(currentGuess.word, this.targetWord);

        if (grid.currentRow < grid.rows) {
          grid.currentRow++;
        }

        break;
      default:
        if (isTurkishLetter(key) && currentGuess.word.length < grid.cols)
          currentGuess.word += key.toLocaleLowerCase("tr");
        break;
    }
  },
});
