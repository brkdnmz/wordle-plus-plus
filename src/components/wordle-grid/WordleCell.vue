<script setup lang="ts">
import { LetterStatus } from "@/types";

const props = defineProps<{
  letter?: string;
  status?: LetterStatus;
  borderWidth?: string;
}>();
</script>

<template>
  <div class="relative">
    <Transition name="outer">
      <div
        :key="props.letter"
        class="flex aspect-square select-none items-center justify-center font-bold text-slate-200"
        :class="{
          'border-slate-600 bg-slate-900': props.status === undefined,
          'bg-[#538d4e]': props.status === LetterStatus.CORRECT,
          'bg-[#b59f3b]': props.status === LetterStatus.MISPLACED,
          'bg-gray-700': props.status === LetterStatus.NOT_FOUND,

          'with-letter': props.letter,
        }"
        :style="{
          borderWidth:
            props.status === undefined ? props.borderWidth : undefined,
        }"
      >
        <!-- 
            This could also be achieved by removing this Transition element and
            add an `inner` class to the element (which I tried), but I prefer this solution.

            `appear` is for enabling the animation during first render, which is always the case.
        -->
        <Transition name="inner" appear>
          <span v-if="props.letter" class="align-middle">
            {{ props.letter }}
          </span>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.inner-enter-active {
  transition: opacity 0.25s ease;
}

.inner-enter-from {
  opacity: 0;
}

.outer-enter-active.with-letter {
  transition: scale 0.25s ease;
}

.outer-leave-active {
  position: absolute;
}

.outer-enter-from.with-letter {
  scale: 1.15;
}

.outer-leave-active {
  display: none;
}
</style>
