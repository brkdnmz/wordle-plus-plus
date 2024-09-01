<script setup lang="ts">
import { RouterView } from "vue-router";
import NavBar from "./components/navbar/NavBar.vue";
</script>

<template>
  <NavBar />
  <RouterView class="py-5" />
</template>
