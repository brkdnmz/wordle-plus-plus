import json
import os
import sys
from typing import List

import requests
from pydantic import BaseModel, RootModel

""" JSON formati
[
    ...
    {"madde": "ala"},
    {"madde": "geyik"},
    ...
]
"""


class Autocompletion(BaseModel):
    madde: str


class TdkData(RootModel):
    root: List[Autocompletion]


# fmt: off
# Normalde alfabede ı, i'den sonra geliyor.
LOWERCASE_LETTERS = ["a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "r", "s", "ş", "t", "u", "ü", "v", "y", "z"]
SPECIAL_LETTERS_MAP = {"â": "a", "û": "u", "î": "i"}
# fmt: on


def fetch_autocompletions() -> List[str]:
    req = requests.get(
        "https://sozluk.gov.tr/autocomplete.json",
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
        },
    )
    autocompletions = TdkData.model_validate(req.json()).root
    autocompletions = [ac.madde for ac in autocompletions]
    return autocompletions


def get_word_list(autocompletions: List[str]) -> List[str]:
    """
    Kelime olma sartlari:
    - Bos olmayacak
    - Sadece harflerden olusacak
    - Kucuk harflerden olusacak (Ozel kelimeleri haric tutmak icin)
    """
    is_word = lambda expr: len(expr) > 0 and all(
        char.isalpha() and char.islower() for char in expr
    )
    word_list = [ac for ac in autocompletions if is_word(ac)]

    # Ozel harfleri halledelim
    for i in range(len(word_list)):
        for original_letter, new_letter in SPECIAL_LETTERS_MAP.items():
            word_list[i] = word_list[i].replace(original_letter, new_letter)

    # Onceki islemden sonra "ala" gibi kelimeler birden fazla kez gececek
    word_list = list(set(word_list))

    # Kelimeleri siralayalim
    word_list.sort(key=lambda word: list(map(LOWERCASE_LETTERS.index, word)))

    return word_list


if __name__ == "__main__":
    autocompletions = fetch_autocompletions()
    words = get_word_list(autocompletions)

    with open(os.path.join(sys.path[0], "words.json"), "w", encoding="utf-8") as f:
        json.dump(words, f, indent=2, ensure_ascii=False)
