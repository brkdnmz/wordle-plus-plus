import { z } from "zod";
import { WordType } from "./types";

export function getWordType(): WordType {
  const localStorageWordType = localStorage.getItem("wordType");
  const parseResult = z.nativeEnum(WordType).safeParse(localStorageWordType);
  const wordType = parseResult.success
    ? parseResult.data
    : WordType.TODAYS_WORD;
  return wordType;
}
