<script setup lang="ts">
import WordleGrid from "@/components/wordle-grid/WordleGrid.vue";
</script>

<template>
  <main class="grid grid-cols-12 pt-10">
    <div class="col-span-8 col-start-3 flex flex-col items-center">
      <WordleGrid />
    </div>
  </main>
</template>
