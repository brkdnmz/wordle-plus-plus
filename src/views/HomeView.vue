<script setup lang="ts">
import KeyBoard from "@/components/keyboard/KeyBoard.vue";
import WordleGrid from "@/components/wordle-grid/WordleGrid.vue";
import { wordleStore } from "@/store";
import { computed } from "vue";

const cellSize = computed(
  () => `min(5rem, ${(100 * (8 / 12) * (10 / 11)) / wordleStore.grid.cols}vw)`,
);
</script>

<template>
  <main class="mx-auto grid w-full max-w-[500px] pt-10">
    <div class="flex w-full flex-col items-center justify-between gap-5">
      <WordleGrid :cell-size="cellSize" />
      <KeyBoard class="px-2" />
    </div>
  </main>
</template>
