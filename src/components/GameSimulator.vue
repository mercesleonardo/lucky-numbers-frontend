<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  minNumber: number; // Ex: 1 (Mega Sena)
  maxNumber: number; // Ex: 60 (Mega Sena)
  numbersPerGame: number; // Ex: 6 (Mega Sena)
  colorClass: string; // nova prop para cor do jogo
  bgClass: string; // nova prop para o fundo dos números
}>();

// Estado para armazenar os jogos gerados
const generatedGames = ref<number[][]>([]);
// Estado para o número de jogos que o usuário deseja gerar
const gamesToGenerate = ref(1);

// Função para gerar um único jogo aleatório sem repetição
function generateSingleGame(): number[] {
  const pool = Array.from({ length: props.maxNumber - props.minNumber + 1 }, (_, i) => i + props.minNumber);
  const game: number[] = [];

  while (game.length < props.numbersPerGame) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const number = pool.splice(randomIndex, 1)[0];
    game.push(number);
  }

  return game.sort((a, b) => a - b); // Ordena os números
}

// Função principal para gerar N jogos
function generateGames() {
  if (gamesToGenerate.value < 1 || gamesToGenerate.value > 10) {
    alert("Por favor, escolha entre 1 e 10 jogos.");
    return;
  }

  generatedGames.value = []; // Limpa jogos anteriores
  for (let i = 0; i < gamesToGenerate.value; i++) {
    generatedGames.value.push(generateSingleGame());
  }
}
</script>

<template>
  <section class="p-6 bg-gray-800/80 rounded-xl shadow-xl border border-gray-700">
    <h2 :class="['text-3xl font-bold text-center mb-6', props.colorClass]">Simulador e Geração de Jogos</h2>

    <div class="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
      <label for="num-games" class="text-lg text-gray-300">Quantos jogos deseja gerar? (Máx. 10)</label>
      <input id="num-games" type="number" v-model.number="gamesToGenerate" min="1" max="10"
        class="w-20 p-2 text-center rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-teal-500 focus:border-teal-500" />
      <button @click="generateGames"
        :class="['px-6 py-2 font-bold rounded-lg transition-colors shadow-md', props.colorClass]">
        Gerar Jogos
      </button>
    </div>

    <div v-if="generatedGames.length" class="mt-8">
      <h3 class="text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-left">Jogos Gerados ({{
        generatedGames.length }})</h3>
      <div class="space-y-4">
        <div v-for="(game, index) in generatedGames" :key="index"
          class="p-4 bg-gray-700 rounded-lg flex flex-wrap items-center justify-between shadow-lg">
          <span :class="['text-lg font-bold mr-4', props.colorClass]">Jogo #{{ index + 1 }}:</span>
          <div class="flex flex-wrap gap-2">
            <span v-for="num in game" :key="num"
              :class="['w-8 h-8 flex items-center justify-center rounded-full text-gray-900 text-sm font-extrabold shadow-md', props.bgClass]">
              {{ String(num).padStart(2, '0') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
