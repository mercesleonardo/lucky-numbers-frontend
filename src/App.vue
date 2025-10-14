<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900">

    <AppHeader />

    <RouterView />

    <AppFooter />
  </div>
</template>
