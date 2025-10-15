<script setup lang="ts">
import GameSimulator from '../components/GameSimulator.vue';
import { RouterLink } from 'vue-router';

// Variáveis de informação para a Lotofácil
const gameMin = 1;
const gameMax = 25;
const gameNumbers = 15;
const lotofacil = 'https://www.loteriasonline.caixa.gov.br/silce-web/#/lotofacil';

</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <header class="text-center mb-12">
        <h1 :class="['text-5xl font-extrabold text-purple-400']">
          Lotofácil
        </h1>
        <p class="mt-4 text-xl text-gray-400">
          Gerador de jogos, histórico de resultados e informações.
        </p>
      </header>

      <div class="mb-12">
        <GameSimulator :min-number="gameMin" :max-number="gameMax" :numbers-per-game="gameNumbers"
          :color-class="'text-purple-400'"
          :bg-class="'bg-purple-500'" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <section
          :class="['lg:col-span-1 p-6 bg-gray-800/80 rounded-xl shadow-xl text-center border-l-4 border-purple-500']">
          <h2 :class="['text-3xl font-bold mb-4 text-purple-400']">Próximo Sorteio</h2>
          <p class="text-5xl font-extrabold text-white">R$ 2.000.000</p>
          <p class="mt-2 text-lg text-gray-400">Diário, amanhã</p>
          <a :href="lotofacil" target="_blank" rel="noopener noreferrer"
            :class="['mt-6 w-full inline-block py-3 font-bold rounded-lg shadow-lg transition-colors bg-black hover:bg-gray-900 text-purple-400 hover:text-purple-300 text-center']">
            Fazer Aposta Online
          </a>
        </section>

        <div class="lg:col-span-2 p-6 bg-gray-800 rounded-xl shadow-xl">
          <h2 class="text-3xl text-purple-400 font-bold mb-6 border-b border-gray-700 pb-2">Último Resultado</h2>

          <div class="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-3 text-sm">
            <div>
              <p class="font-semibold text-purple-400">Concurso 3051</p>
              <p class="text-gray-400">Hoje, 13/10/2025</p>
            </div>
            <div class="flex flex-wrap gap-1 max-w-lg justify-end">
              <span v-for="n in [1, 2, 3, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 21, 23]" :key="n"
                :class="['w-6 h-6 flex items-center justify-center rounded-full font-bold text-gray-900 text-xs bg-purple-500']">
                {{ String(n).padStart(2, '0') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
