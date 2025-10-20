<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { useLottery } from './services/useLottery';

const { loadGamesInfo } = useLottery();

onMounted(() => {
  loadGamesInfo();
});
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-900">
    <AppHeader />

    <RouterView />

    <AppFooter />
  </div>
</template>