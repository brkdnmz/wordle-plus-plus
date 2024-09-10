import { getRandomWord, getTodaysWord, WORDS_BY_LENGTH_MAP } from "@/data";
import { getWordType } from "@/local-storage";
import { LetterStatus, WordType } from "@/types";
import { compare, isTurkishLetter } from "@/util";
import { reactive } from "vue";
import { DEFAULT_COLS, DEFAULT_ROWS } from "./constants";
import type { WordleStore } from "./types";

export const wordleStore = reactive<WordleStore>({
  gameStarted: false,
  wordsByLength: WORDS_BY_LENGTH_MAP,
  targetWord: (getWordType() === WordType.TODAYS_WORD
    ? getTodaysWord
    : getRandomWord)(DEFAULT_COLS),
  grid: {
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    currentRow: 0,
  },
  guesses: [],
  letterStatuses: {},
  canWrite: true,

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
    if (!this.canWrite) {
      return;
    }

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

        for (
          let letterIndex = 0;
          letterIndex < currentGuess.word.length;
          letterIndex++
        ) {
          const letter = currentGuess.word[letterIndex];
          const status = currentGuess.status[letterIndex];
          switch (status) {
            case LetterStatus.NOT_FOUND:
              this.letterStatuses[letter] ??= LetterStatus.NOT_FOUND;
              break;
            case LetterStatus.MISPLACED:
              if (
                this.letterStatuses[letter] === undefined ||
                this.letterStatuses[letter] === LetterStatus.NOT_FOUND
              )
                this.letterStatuses[letter] = LetterStatus.MISPLACED;
              break;
            case LetterStatus.CORRECT:
              this.letterStatuses[letter] = LetterStatus.CORRECT;
              break;

            default:
              break;
          }
        }

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
  setCanWrite(canWrite) {
    this.canWrite = canWrite;
  },
});

export function onKeyPress(key: string) {
  if (!wordleStore.gameStarted && isTurkishLetter(key)) {
    wordleStore.startGame();
  }

  if (wordleStore.gameStarted) wordleStore.onKeyPress(key);
}
