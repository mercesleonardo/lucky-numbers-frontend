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
    numbers: [5, 18, 27, 44, 72], // Corrigido o 0 inicial (05 -> 5)
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

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <ResultCard v-for="result in latestResults" :key="result.title" :title="result.title" :numbers="result.numbers"
          :contest="result.contest" :date="result.date" :colorClass="result.colorClass" :routeName="result.routeName" />
      </div>

      <section class="mt-16 p-8 bg-gray-800/80 rounded-xl shadow-inner text-center border border-gray-700">
        <h2 class="text-3xl font-bold text-indigo-400">Próximo Grande Sorteio</h2>
        <p class="text-lg text-gray-300 mt-2">A Mega-Sena acumulou em **R$ 150 Milhões**! Não perca a chance.</p>
        <RouterLink :to="{ name: 'megasena' }"
          class="mt-6 inline-block px-10 py-3 bg-red-600 text-white font-bold text-lg rounded-lg shadow-xl hover:bg-red-700 transition-colors duration-200 transform hover:scale-[1.03]">
          Ver Detalhes do Acúmulo
        </RouterLink>
      </section>

    </div>
  </main>
</template>
