<script setup lang="ts">
import { wordleStore } from "@/store";
import { computed } from "vue";
import WordleCell from "./WordleCell.vue";

const props = defineProps<{ rowIndex: number }>();

const word = computed(() => wordleStore.guesses[props.rowIndex]?.word);
const status = computed(() => wordleStore.guesses[props.rowIndex]?.status);
</script>

<template>
  <div class="flex items-center justify-center gap-2">
    <div v-for="colIndex in wordleStore.grid.cols" :key="colIndex">
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
          wordleStore.setCanWrite(colIndex === wordleStore.grid.cols)
        "
      >
        <WordleCell
          :key="`${colIndex}-${status?.[colIndex - 1]}`"
          :letter="word?.[colIndex - 1]?.toLocaleUpperCase('tr') ?? ''"
          :status="status?.[colIndex - 1]"
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
