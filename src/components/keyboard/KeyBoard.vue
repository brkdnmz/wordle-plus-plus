<script setup lang="ts">
import { wordleStore } from "@/store";
import { onKeyPress } from "@/store/wordle-store";
import { LetterStatus } from "@/types";
import { CornerDownLeftIcon, DeleteIcon } from "lucide-vue-next";
import { computed } from "vue";
import { KEYBOARD_LAYOUT } from "./keyboard-layout";
import KeyboardKey from "./KeyboardKey.vue";

const letterStatuses = computed(() => wordleStore.letterStatuses);
</script>

<template>
  <div class="w-full select-none">
    <div class="grid gap-1 rounded-xl border border-slate-600 bg-slate-900 p-3">
      <div
        v-for="(row, rowIndex) in KEYBOARD_LAYOUT"
        :key="rowIndex"
        class="flex justify-center gap-1"
      >
        <KeyboardKey
          v-for="letter in row"
          :key="letter"
          @press="onKeyPress(letter)"
          :class="{
            'bg-[#538d4e]': letterStatuses[letter] === LetterStatus.CORRECT,
            'bg-[#b59f3b]': letterStatuses[letter] === LetterStatus.MISPLACED,
            'bg-gray-700': letterStatuses[letter] === LetterStatus.NOT_FOUND,
          }"
        >
          {{ letter.toLocaleUpperCase("tr") }}
        </KeyboardKey>

        <KeyboardKey
          v-if="rowIndex === 0"
          class="max-w-20"
          @press="onKeyPress('Backspace')"
        >
          <DeleteIcon />
        </KeyboardKey>
        <KeyboardKey
          v-else-if="rowIndex === 1"
          class="max-w-20"
          @press="onKeyPress('Enter')"
        >
          <CornerDownLeftIcon />
        </KeyboardKey>
      </div>
    </div>
  </div>
</template>
