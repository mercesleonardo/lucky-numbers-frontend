<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useLottery, type SessionStats } from '@/services/useLottery';

const GAME_SLUG = 'megasena';

const { 
  loading,
  loadingContest,
  latestContest,
  sessionStats, 
  error,
  loadLatestContest,
  generateGames, 
  loadSessionStats
} = useLottery();

const quantity = ref(1);
const generatedNumbers = ref<number[][]>([]);
const generationError = ref<string | null>(null); 

const maxGamesAllowed = computed(() => {
  return sessionStats.value?.remaining ?? 20;
});

const formattedDate = computed(() => {
  if (!latestContest.value?.contest?.draw_date) return '';
  return new Date(latestContest.value.contest.draw_date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC'
  });
});

const handleGenerate = async () => {
  generationError.value = null; 
  generatedNumbers.value = []; 
  try {
    if (quantity.value > maxGamesAllowed.value) {
      quantity.value = maxGamesAllowed.value;
    }
    if (quantity.value < 1) {
      quantity.value = 1;
    }

    const result = await generateGames(GAME_SLUG, { 
      count: quantity.value,
    });
    if (result) {
      generatedNumbers.value = result.games;
    }
  } catch (e) {
    if (error.value && error.value.error) {
      generationError.value = `${error.value.error}. Você ainda pode gerar ${error.value.remaining} jogo(s).`;
    } else {
      generationError.value = 'Ocorreu um erro desconhecido ao gerar os jogos.';
    }
  }
};

// Observa o limite de jogos e exibe a mensagem de erro quando o limite é atingido
watch(maxGamesAllowed, (newMax) => {
  if (newMax <= 0) {
    generationError.value = 'Você atingiu o limite de 20 jogos por sessão.';
  }
});

onMounted(() => {
  loadLatestContest(GAME_SLUG);
  loadSessionStats();
});
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold text-green-400">Mega-Sena</h1>
        <p class="mt-4 text-xl text-gray-400">Confira o último resultado e gere seus jogos da sorte.</p>
      </header>

      <!-- Seção Último Resultado -->
      <section class="mb-12">
        <h2 class="text-3xl text-green-400 font-bold mb-6 border-b border-gray-700 pb-2">Último Resultado</h2>
        <div v-if="loadingContest" class="text-center text-gray-400">
          Carregando último resultado...
        </div>
        <div v-else-if="latestContest && latestContest.contest" class="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div class="flex justify-between items-center">
            <div>
              <p class="font-semibold text-lg">Concurso {{ latestContest.contest.draw_number }}</p>
              <p class="text-sm text-gray-400">{{ formattedDate }}</p>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span v-for="n in latestContest.contest.numbers" :key="n"
                class="w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-900 bg-green-500 text-lg">
                {{ n }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Não foi possível carregar o último resultado.
        </div>
      </section>

      <!-- Seção Gerador de Jogos -->
      <section>
        <h2 class="text-3xl text-green-400 font-bold mb-6 border-b border-gray-700 pb-2">Gerador de Jogos</h2>
        
        <div class="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div v-if="sessionStats" class="text-center text-gray-400 mb-4 text-sm">
            Você já gerou <span class="font-bold text-white">{{ sessionStats.generated_today }}</span> de <span class="font-bold text-white">20</span> jogos hoje.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div class="md:col-span-3">
              <label for="quantity" class="block mb-2 text-sm font-medium text-gray-300">Quantidade de Jogos (Máx: {{ maxGamesAllowed }})</label>
              <input type="number" id="quantity" v-model.number="quantity" :max="maxGamesAllowed" min="1"
                class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5 focus:ring-green-500 focus:border-green-500">
            </div>
          </div>

          <div class="text-center mt-6">
            <button @click="handleGenerate" :disabled="loading || maxGamesAllowed === 0"
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed">
              <span v-if="loading">Gerando...</span>
              <span v-else-if="maxGamesAllowed === 0">Limite Atingido</span>
              <span v-else>Gerar Jogos</span>
            </button>
          </div>

          <!-- Mensagem de Erro -->
          <div v-if="generationError" class="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">
            {{ generationError }}
          </div>
        </div>

        <!-- Jogos Gerados -->
        <div v-if="generatedNumbers.length > 0" class="mt-8">
          <h3 class="text-2xl text-green-400 font-bold mb-4">Seus Números da Sorte:</h3>
          <div class="space-y-3">
            <div v-for="(game, index) in generatedNumbers" :key="index" 
              class="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-lg">
              <span class="text-gray-400 font-semibold">Jogo {{ index + 1 }}:</span>
              <div class="flex gap-2 flex-wrap">
                <span v-for="num in game" :key="num"
                  class="w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-900 bg-green-500">
                  {{ String(num).padStart(2, '0') }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </main>
</template>