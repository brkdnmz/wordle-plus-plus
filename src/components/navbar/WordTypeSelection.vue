<script setup lang="ts">
import { wordleStore } from "@/store";
import { localStore } from "@/store/local-store";
import { WordType } from "@/types";
import { computed } from "vue";

const wordType = computed(() => localStore.wordType);
const isTodaysWord = computed(() => wordType.value === WordType.TODAYS_WORD);
const isRandomWord = computed(() => wordType.value === WordType.RANDOM_WORD);
</script>

<template>
  <div
    class="flex justify-center"
    :class="{ 'cursor opacity-50': wordleStore.gameStarted }"
  >
    <button
      class="w-36 rounded-bl-lg bg-slate-900 px-2 py-1 text-slate-400"
      :class="{
        'border border-slate-400 font-semibold': isTodaysWord,
        'cursor-not-allowed': wordleStore.gameStarted,
      }"
      @click="localStore.setWordType(WordType.TODAYS_WORD)"
      :disabled="wordleStore.gameStarted"
    >
      Günün Kelimesi
    </button>
    <button
      class="w-36 rounded-br-lg bg-slate-900 px-2 py-1 text-slate-400"
      :class="{
        'border border-slate-400 font-semibold': isRandomWord,
        'cursor-not-allowed': wordleStore.gameStarted,
      }"
      @click="localStore.setWordType(WordType.RANDOM_WORD)"
      :disabled="wordleStore.gameStarted"
    >
      Rastgele
    </button>
  </div>
</template>
