import wordList from "@/../data/words.json";

function getWordsByLength(): string[][] {
  const wordsByLength: string[][] = [];

  for (const word of wordList) {
    wordsByLength[word.length] ??= [];
    wordsByLength[word.length].push(word);
  }

  return wordsByLength;
}

// Not actually a map, but a proper name I assume
export const WORDS_BY_LENGTH_MAP = getWordsByLength();

const MILLISECS_IN_DAY = 1000 * 60 * 60 * 24;

export function getTodaysWord(wordLength: number): string {
  const now = Date.now();
  const daysSinceEpoch = Math.floor(now / MILLISECS_IN_DAY);
  const index =
    (34634 * daysSinceEpoch + 23532) % WORDS_BY_LENGTH_MAP[wordLength].length;
  return WORDS_BY_LENGTH_MAP[wordLength][index];
}

export function getRandomWord(wordLength: number): string {
  const index = Math.floor(
    Math.random() * WORDS_BY_LENGTH_MAP[wordLength].length,
  );
  return WORDS_BY_LENGTH_MAP[wordLength][index];
}
