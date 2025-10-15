<script setup lang="ts">
import ResultCard from '../components/ResultCard.vue';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

// 1. Definição dos Dados Reais (ajustados para o novo design)
const latestResults = computed(() => [
  {
    title: 'Mega-Sena',
    numbers: [6, 12, 23, 34, 45, 56],
    contest: 2678,
    date: '12/10/2025',
    routeName: 'megasena',
    // Cores do Tailwind (ajustar conforme sua paleta V4)
    colorClass: 'bg-green-600 hover:bg-green-700',
  },
  {
    title: 'Quina',
    numbers: [5, 18, 27, 44, 72],
    contest: 6123,
    date: '13/10/2025',
    routeName: 'quina',
    colorClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    title: 'Lotofácil',
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    contest: 2950,
    date: '14/10/2025',
    routeName: 'lotofacil',
    colorClass: 'bg-purple-600 hover:bg-purple-700',
  },
]);
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <h1
        class="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500">
        Últimos Resultados da Loteria
      </h1>

      <p class="text-lg text-gray-300 text-center mb-4 font-semibold">
        Confira os últimos resultados das loterias mais populares e aproveite para criar jogos únicos e personalizados
        do seu jeito.
      </p>
      <p class="text-base text-gray-300 text-center mb-8 font-semibold">
        Experimente, simule e aumente suas chances de sorte!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <ResultCard v-for="result in latestResults" :key="result.title" :title="result.title" :numbers="result.numbers"
          :contest="result.contest" :date="result.date" :colorClass="result.colorClass" :routeName="result.routeName" />
      </div>

    </div>
  </main>
</template>
