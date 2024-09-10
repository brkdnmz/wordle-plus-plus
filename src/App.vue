<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/navbar/NavBar.vue";
</script>

<template>
  <div class="flex h-full min-h-screen flex-col">
    <NavBar />
    <RouterView class="flex-auto py-5" />
  </div>
</template>
