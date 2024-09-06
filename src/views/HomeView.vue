<script setup lang="ts">
import WordleGrid from "@/components/wordle-grid/WordleGrid.vue";
import { wordleStore } from "@/store";
import { computed } from "vue";

const cellSize = computed(
  () => `min(5rem, ${(100 * (8 / 12) * (10 / 11)) / wordleStore.grid.cols}vw)`,
);
</script>

<template>
  <main class="grid grid-cols-12 pt-10">
    <div class="col-span-8 col-start-3 flex flex-col items-center">
      <WordleGrid :cell-size="cellSize" />
    </div>
  </main>
</template>
