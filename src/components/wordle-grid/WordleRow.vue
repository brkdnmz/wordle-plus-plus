<script setup lang="ts">
import { wordleStore } from "@/store";
import { computed } from "vue";
import WordleCell from "./WordleCell.vue";

const props = defineProps<{
  rowIndex: number;
  cellSize: string;
  gap: string;
}>();

const word = computed(() => wordleStore.guesses[props.rowIndex]?.word);
const status = computed(() => wordleStore.guesses[props.rowIndex]?.status);

const cols = computed(() => wordleStore.grid.cols);

const borderWidth = computed(() => `calc(${props.cellSize} / 18)`);
const fontSize = computed(() => `calc(${props.cellSize} / 2.2)`);
</script>

<template>
  <div class="flex items-center justify-center" :style="{ gap: props.gap }">
    <div v-for="colIndex in cols" :key="colIndex">
      <Transition
        name="entered-guess"
        mode="out-in"
        @before-leave="
          (el) => {
            // Disable writing before the first letter's animation starts
            if (colIndex === 1) {
              wordleStore.setCanWrite(false);
            }

            (el as HTMLElement).style.transitionDelay =
              0.4 * (colIndex - 1) + 's';
          }
        "
        @after-enter="
          // Enable writing after the last letter's animation finishes
          wordleStore.setCanWrite(colIndex === cols)
        "
      >
        <WordleCell
          :key="`${colIndex}-${status?.[colIndex - 1]}`"
          :letter="word?.[colIndex - 1]?.toLocaleUpperCase('tr') ?? ''"
          :status="status?.[colIndex - 1]"
          :border-width="borderWidth"
          :style="{
            width: cellSize,
            fontSize,
          }"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.entered-guess-enter-active,
.entered-guess-leave-active {
  opacity: 1;
  transition: all 0.25s ease-in;
}

.entered-guess-enter-from {
  transform: rotateX(90deg);
}
.entered-guess-leave-to {
  transform: rotateX(-90deg);
}
</style>
