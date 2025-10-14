<script setup lang="ts">
import GameSimulator from '../components/GameSimulator.vue';
import { RouterLink } from 'vue-router';

// Variáveis de cor e informação para a Mega-Sena
const gameColor = 'green';
const gameTitle = 'Mega-Sena';
const gameMin = 1;
const gameMax = 60;
const gameNumbers = 6;
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <header class="text-center mb-12">
        <h1 :class="['text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r', `from-${gameColor}-400 to-indigo-500`]">
          {{ gameTitle }}
        </h1>
        <p class="mt-4 text-xl text-gray-400">
          Gerador de jogos, histórico de resultados e informações.
        </p>
      </header>

      <div class="mb-12">
        <GameSimulator
          :min-number="gameMin"
          :max-number="gameMax"
          :numbers-per-game="gameNumbers"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <section :class="['lg:col-span-1 p-6 bg-gray-800/80 rounded-xl shadow-xl text-center', `border-l-4 border-${gameColor}-500`]">
          <h2 :class="['text-3xl font-bold mb-4', `text-${gameColor}-400`]">Próximo Sorteio</h2>
          <p class="text-5xl font-extrabold text-white">R$ 150.000.000</p>
          <p class="mt-2 text-lg text-gray-400">Quarta-feira, 15 de Outubro</p>
          <button :class="['mt-6 w-full py-3 text-white font-bold rounded-lg shadow-lg transition-colors', `bg-${gameColor}-600 hover:bg-${gameColor}-700`]">
            Fazer Aposta Online
          </button>
        </section>

        <div class="lg:col-span-2 p-6 bg-gray-800 rounded-xl shadow-xl">
          <h2 class="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Últimos Resultados</h2>

          <div class="flex justify-between items-center bg-gray-700 p-4 rounded-lg mb-3">
            <div>
              <p class="font-semibold">Concurso 2701</p>
              <p class="text-sm text-gray-400">Sábado, 11/10/2025</p>
            </div>
            <div class="flex gap-2">
              <span v-for="n in [1, 12, 34, 45, 51, 59]" :key="n"
                :class="['w-8 h-8 flex items-center justify-center rounded-full font-bold text-gray-900', `bg-${gameColor}-500`]">
                {{ String(n).padStart(2, '0') }}
              </span>
            </div>
          </div>

          <div class="text-center mt-6">
            <button :class="['font-semibold transition-colors', `text-${gameColor}-400 hover:text-${gameColor}-300`]">
              Ver histórico completo
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
