<script setup lang="ts">
import { wordleStore } from "@/store";

function onRowCountChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  wordleStore.setRows(Number(target.value));
}
function onColCountChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  wordleStore.setCols(Number(target.value));
}
</script>

<template>
  <div class="relative w-full pt-5">
    <div
      v-if="!wordleStore.gameStarted"
      class="absolute inset-x-0 bottom-0 flex justify-center gap-2"
    >
      <label class="inline-flex gap-2">
        <select :value="wordleStore.grid.rows" @change="onRowCountChange">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>

      <span class="text-slate-500">X</span>

      <label class="inline-flex gap-2">
        <select :value="wordleStore.grid.cols" @change="onColCountChange">
          <option v-for="n in 15" :key="n" :value="n">{{ n }}</option>
        </select>
      </label>
    </div>
  </div>
</template>
