import fs from "node:fs/promises";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fetchAutocompletions(): Promise<string[]> {
  let data: unknown;
  try {
    data = await (
      await fetch("https://sozluk.gov.tr/autocomplete.json")
    ).json();
  } catch (e) {
    console.log("Veriyi cekerken bir hata meydana geldi:");
    throw e;
  }

  // {madde: <kelime>} listesi
  const autocompletionsSchema = z
    .object({
      madde: z.string(),
    })
    .array();

  // Format kontrolu
  const parseResult = autocompletionsSchema.safeParse(data);

  if (parseResult.error) {
    throw new Error("Beklenmedik veri formatiyla karsilasildi");
  }

  const autocompletions = parseResult.data.map(({ madde }) => madde);
  autocompletions.sort(Intl.Collator("tr").compare); // Turkce alfabesine gore sirala

  // Alfabede normalde i, ı'dan once geliyor ama JS'te durum tam tersi...

  return autocompletions;
}

function extractWords(autocompletions: string[]): string[] {
  /*
    Tum harfleri kucuk olan Turkce (Unicode) kelime kontrolu.

    \p{Ll} -> Lowercase Unicode harf
    +      -> En az bir harf
    ^...$  -> Bastan sona kadar
    u      -> Unicode destegi etkinlestirme modifier'i
  */
  function isLowerCaseWord(str: string): boolean {
    return /^\p{Ll}+$/u.test(str);
  }

  const words = autocompletions.filter((ac) => isLowerCaseWord(ac));

  const specialLetterMapping = { â: "a", û: "u", î: "i" };
  const specialLetters = Object.keys(specialLetterMapping);

  const words_specialLettersReplaced = words.map((word) =>
    word.replace(new RegExp(specialLetters.join("|"), "gu"), (m) => {
      return specialLetterMapping[m];
    }),
  );

  const uniqueWords = [...new Set(words_specialLettersReplaced)];

  return uniqueWords;
}

const autocompletions = await fetchAutocompletions();
const words = extractWords(autocompletions);

await fs.writeFile(
  path.join(__dirname, "words.json"),
  JSON.stringify(words, null, 2),
);
