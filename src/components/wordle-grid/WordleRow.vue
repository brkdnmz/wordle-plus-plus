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
        mode="out-in"
        @before-leave="
          (el) => {
            (el as HTMLElement).style.transitionDelay =
              0.4 * (colIndex - 1) + 's';
          }
        "
      >
        <WordleCell
          :key="`${colIndex}-${status?.[colIndex - 1]}`"
          :letter="word?.[colIndex - 1]?.toLocaleUpperCase('tr') ?? ''"
          :status="status?.[colIndex - 1]"
          class="basis-1/5"
        />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  opacity: 1;
  transition: all 0.25s ease-in;
}

/* .v-leave-active {
  transition-delay: 1s;
} */

.v-enter-from {
  transform: rotateX(90deg);
}
.v-leave-to {
  transform: rotateX(-90deg);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
/* .v-leave-active {
  position: absolute;
} */
</style>
