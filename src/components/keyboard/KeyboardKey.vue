<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { useAttrs } from "vue";

// https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits
const emit = defineEmits<{
  press: [];
}>();

const attrs = useAttrs();
</script>

<template>
  <button
    :class="
      twMerge(
        'flex h-14 flex-auto items-center justify-center rounded-lg border border-slate-600 bg-slate-500 px-0 text-xl font-bold transition duration-100 hover:text-slate-300 hover:contrast-125',
        attrs.class as string | undefined,
      )
    "
    @click="emit('press')"
  >
    <slot />
  </button>
</template>
