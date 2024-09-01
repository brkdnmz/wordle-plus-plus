export enum WordType {
  TODAYS_WORD = "Today's Word",
  RANDOM_WORD = "Random Word",
}

export enum LetterStatus {
  NOT_FOUND = "NOT_FOUND",
  MISPLACED = "MISPLACED",
  CORRECT = "CORRECT",
}

export type GuessStatus = LetterStatus[];
