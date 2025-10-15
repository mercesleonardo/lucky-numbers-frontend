<script setup lang="ts">
import GameSimulator from '../components/GameSimulator.vue';
import { RouterLink } from 'vue-router';

// Variáveis de informação para a Mega-Sena
const gameMin = 1;
const gameMax = 60;
const gameNumbers = 6;
const megasena = 'https://www.loteriasonline.caixa.gov.br/silce-web/#/mega-sena';
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <header class="text-center mb-12">
        <h1 :class="['text-5xl font-extrabold text-green-400']">
          Mega-Sena
        </h1>
        <p class="mt-4 text-xl text-gray-400">
          Gerador de jogos, histórico de resultados e informações.
        </p>
      </header>

      <div class="mb-12">
        <GameSimulator :min-number="gameMin" :max-number="gameMax" :numbers-per-game="gameNumbers"
          :color-class="'text-green-400'" :bg-class="'bg-green-500'" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <section
          :class="['lg:col-span-1 p-6 bg-gray-800/80 rounded-xl shadow-xl text-center border-l-4 border-green-500']">
          <h2 :class="['text-3xl font-bold mb-4 text-green-400']">Próximo Sorteio</h2>
          <p class="text-5xl font-extrabold text-white">R$ 150.000.000</p>
          <p class="mt-2 text-lg text-gray-400">Quarta-feira, 15 de Outubro</p>
          <a :href="megasena" target="_blank" rel="noopener noreferrer"
            :class="['mt-6 w-full inline-block py-3 font-bold rounded-lg shadow-lg transition-colors bg-black hover:bg-gray-900 text-green-400 hover:text-green-300 text-center']">
            Fazer Aposta Online
          </a>
        </section>

        <div class="lg:col-span-2 p-6 bg-gray-800 rounded-xl shadow-xl">
          <h2 class="text-3xl text-green-400 font-bold mb-6 border-b border-gray-700 pb-2">Último Resultado</h2>

          <div class="flex flex-col lg:flex-row lg:justify-between lg:items-center bg-gray-700 p-4 rounded-lg mb-3">
            <div class="mb-3 lg:mb-0">
              <p class="font-semibold">Concurso 2701</p>
              <p class="text-sm text-gray-400">Sábado, 11/10/2025</p>
            </div>
            <div class="flex gap-2">
              <span v-for="n in [1, 12, 34, 45, 51, 59]" :key="n"
                :class="['w-8 h-8 flex items-center justify-center rounded-full font-bold text-gray-900 bg-green-500']">
                {{ String(n).padStart(2, '0') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
