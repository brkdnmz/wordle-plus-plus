<script setup lang="ts">
import { LetterStatus } from "@/types";

const props = defineProps<{ letter?: string; status?: LetterStatus }>();
</script>

<template>
  <div class="relative">
    <Transition name="outer">
      <div
        :key="props.letter"
        class="flex aspect-square w-20 select-none items-center justify-center text-4xl font-bold text-slate-200"
        :class="{
          'border-4 border-slate-600 bg-slate-900': props.status === undefined,
          'bg-[#538d4e]': props.status === LetterStatus.CORRECT,
          'bg-[#b59f3b]': props.status === LetterStatus.MISPLACED,
          'bg-gray-700': props.status === LetterStatus.NOT_FOUND,

          'with-letter': props.letter,
        }"
      >
        <Transition name="inner">
          <span v-if="props.letter" class="align-middle">{{
            props.letter
          }}</span>
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
</style>
