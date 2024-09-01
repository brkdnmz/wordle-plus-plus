import { LetterStatus, type GuessStatus } from "./types";

export function isTurkishLetter(letter: string): boolean {
  return /^\p{L}$/u.test(letter);
}

export function compare(guess: string, target: string): GuessStatus {
  // Both will be lowercase

  const letterCounts: Record<string, number> = {};
  for (const letter of target) {
    letterCounts[letter] ??= 0;
    letterCounts[letter]++;
  }

  const status: GuessStatus = [];
  for (let letterPos = 0; letterPos < guess.length; letterPos++) {
    const guessedLetter = guess[letterPos];
    const correctLetter = target[letterPos];

    if (guessedLetter === correctLetter) {
      status[letterPos] = LetterStatus.CORRECT;
      letterCounts[guessedLetter]--;
    }
  }

  for (let letterPos = 0; letterPos < guess.length; letterPos++) {
    const guessedLetter = guess[letterPos];
    const correctLetter = target[letterPos];

    if (guessedLetter === correctLetter) continue;

    if (letterCounts[guessedLetter]) status[letterPos] = LetterStatus.MISPLACED;
    else if (guessedLetter !== correctLetter)
      status[letterPos] = LetterStatus.NOT_FOUND;

    letterCounts[guessedLetter]--;
  }

  return status;
}
