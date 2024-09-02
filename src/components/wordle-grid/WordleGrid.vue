<script setup lang="ts">
import { wordleStore } from "@/store";
import { isTurkishLetter } from "@/util";
import { onMounted, onUnmounted } from "vue";
import SizeSelector from "./SizeSelector.vue";
import WordleRow from "./WordleRow.vue";

const onKeyPress = (e: KeyboardEvent) => {
  if (!wordleStore.gameStarted && isTurkishLetter(e.key)) {
    wordleStore.startGame();
  }

  if (wordleStore.gameStarted) wordleStore.onKeyPress(e.key);
};

onMounted(() => {
  document.addEventListener("keydown", onKeyPress);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeyPress);
});
</script>

<template>
  <div class="grid gap-10">
    <SizeSelector />

    <div class="grid gap-2 overflow-auto">
      <WordleRow
        v-for="rowIndex in wordleStore.grid.rows"
        :key="rowIndex"
        :row-index="rowIndex - 1"
      />
    </div>
  </div>
</template>
