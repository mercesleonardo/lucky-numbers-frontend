<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useLottery } from '../services/useLottery';

import CheckNumbers from './CheckNumbers.vue';

const props = defineProps<{
  gameSlug: string;
  gameName: string;
  color: string;
}>();

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
  return sessionStats.value?.remaining ?? 100;
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

    const result = await generateGames(props.gameSlug, {
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

watch(maxGamesAllowed, (newMax) => {
  if (newMax <= 0) {
    const totalGames = sessionStats.value ? sessionStats.value.generated_today + sessionStats.value.remaining : '';
    generationError.value = `Você atingiu o limite de ${totalGames} jogos por sessão.`;
  }
});

onMounted(() => {
  loadLatestContest(props.gameSlug);
  loadSessionStats();
});

const colorMap = {
  green: {
    text: 'text-green-400',
    bg: 'bg-green-500',
    ring: 'focus:ring-green-500',
    border: 'focus:border-green-500',
    buttonBg: 'bg-green-600',
    buttonHoverBg: 'hover:bg-green-700',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500',
    ring: 'focus:ring-purple-500',
    border: 'focus:border-purple-500',
    buttonBg: 'bg-purple-600',
    buttonHoverBg: 'hover:bg-purple-700',
  },
  blue: {
    text: 'text-blue-400',
    bg: 'bg-blue-500',
    ring: 'focus:ring-blue-500',
    border: 'focus:border-blue-500',
    buttonBg: 'bg-blue-600',
    buttonHoverBg: 'hover:bg-blue-700',
  },
}

const colorClasses = computed(() => colorMap[props.color]);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">

      <header class="text-center mb-12">
        <h1 class="text-5xl font-extrabold" :class="colorClasses.text">{{ gameName }}</h1>
        <p class="mt-4 text-lg text-gray-300 text-center mb-4 font-semibold">
          Use nossas ferramentas para gerar seus números da sorte para a {{ gameName }}, conferir os resultados mais recentes e verificar se seus jogos já foram premiados em concursos anteriores.
        </p>
      </header>

      <!-- Seção Gerador de Jogos -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 border-b border-gray-700 pb-2" :class="colorClasses.text">Gerador de Jogos</h2>

        <div class="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div v-if="sessionStats" class="text-center text-gray-400 mb-4 text-sm">
            Você já gerou <span class="font-bold text-white">{{ sessionStats.generated_today }}</span> de <span
              class="font-bold text-white">{{ sessionStats.generated_today + sessionStats.remaining }}</span> jogos hoje.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div class="md:col-span-3">
              <label for="quantity" class="block mb-2 text-sm font-medium text-gray-300">Quantidade de Jogos (Máx: {{
                maxGamesAllowed }})</label>
              <input type="number" id="quantity" v-model.number="quantity" :max="maxGamesAllowed" min="1"
                class="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2.5"
                :class="[colorClasses.ring, colorClasses.border]">
            </div>
          </div>

          <div class="text-center mt-6">
            <button @click="handleGenerate" :disabled="loading || maxGamesAllowed === 0"
              class="text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
              :class="[colorClasses.buttonBg, colorClasses.buttonHoverBg]">
              <span v-if="loading">Gerando...</span>
              <span v-else-if="maxGamesAllowed === 0">Limite Atingido</span>
              <span v-else :class="colorClasses.text">Gerar Jogos</span>
            </button>
          </div>

          <!-- Mensagem de Erro -->
          <div v-if="generationError" class="mt-4 text-center text-red-400 bg-red-900/30 p-3 rounded-lg">
            {{ generationError }}
          </div>
        </div>

        <!-- Jogos Gerados -->
        <div v-if="generatedNumbers.length > 0" class="mt-8">
          <h3 class="text-2xl font-bold mb-4" :class="colorClasses.text">Seus Números da Sorte:</h3>
          <div class="space-y-3">
            <div v-for="(game, index) in generatedNumbers" :key="index"
              class="bg-gray-800 p-4 rounded-lg flex items-center gap-4 shadow-lg">
              <span class="text-gray-400 font-semibold">Jogo {{ index + 1 }}:</span>
              <div class="flex gap-2 flex-wrap">
                <span v-for="num in game" :key="num"
                  class="w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-900"
                  :class="colorClasses.bg">
                  {{ String(num).padStart(2, '0') }}
                </span>
              </div>
            </div>
          </div>
        </div>

      </section>

      <!-- Seção Último Resultado -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold mb-6 border-b border-gray-700 pb-2" :class="colorClasses.text">Último Resultado</h2>
        <div v-if="loadingContest" class="text-center text-gray-400">
          Carregando último resultado...
        </div>
        <div v-else-if="latestContest && latestContest.contest" class="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <div>
              <p class="font-semibold text-lg">Concurso {{ latestContest.contest.draw_number }}</p>
              <p class="text-sm text-gray-400">{{ formattedDate }}</p>
            </div>
            <div class="flex gap-2 flex-wrap">
              <span v-for="n in latestContest.contest.numbers" :key="n"
                class="w-10 h-10 flex items-center justify-center rounded-full font-bold text-gray-900 text-lg"
                :class="colorClasses.bg">
                {{ n }}
              </span>
            </div>
          </div>

          <!-- Tabela de Prêmios -->
          <div class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-400">
              <thead class="text-xs text-gray-300 uppercase bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3">Faixa</th>
                  <th scope="col" class="px-6 py-3 text-center">Ganhadores</th>
                  <th scope="col" class="px-6 py-3 text-right">Prêmio</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="prize in latestContest.contest.prizes" :key="prize.tier"
                  class="border-b border-gray-700 hover:bg-gray-600">
                  <td class="px-6 py-4 font-medium text-white whitespace-nowrap">{{ prize.description }}</td>
                  <td class="px-6 py-4 text-center">{{ prize.winners }}</td>
                  <td class="px-6 py-4 text-right">{{ formatCurrency(prize.prize_amount) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div v-else class="text-center text-gray-500">
          Não foi possível carregar o último resultado.
        </div>
      </section>

      <CheckNumbers :game-slug="gameSlug" :color="color" />

    </div>
  </main>
</template>
