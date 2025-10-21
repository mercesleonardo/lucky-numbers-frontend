<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLottery } from '@/services/useLottery'
import ResultCard from '../components/ResultCard.vue'

const {
  contests: latestResults,
  loading,
  loadLatestContests,
  gamesInfo,
} = useLottery()

onMounted(loadLatestContests)

const validResults = computed(() =>
  latestResults.value.filter(
    (r) => r.contest && r.contest.numbers && r.contest.numbers.length > 0,
  ),
)

const getGameDetails = (gameSlug: string) => {
  const details: { [key: string]: { colorClass: string; routeName: string } } = {
    megasena: {
      colorClass: 'bg-green-600 hover:bg-green-700',
      routeName: 'megasena',
    },
    quina: {
      colorClass: 'bg-blue-600 hover:bg-blue-700',
      routeName: 'quina',
    },
    lotofacil: {
      colorClass: 'bg-purple-600 hover:bg-purple-700',
      routeName: 'lotofacil',
    },
  }
  return details[gameSlug] || { colorClass: 'bg-gray-600 hover:bg-gray-700', routeName: '' }
}
</script>

<template>
  <main class="min-h-screen bg-gray-900 text-white pt-20">
    <div class="container mx-auto py-8 px-4">
      <h1
        class="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500"
      >
        Últimos Resultados da Loteria
      </h1>

      <p class="text-lg text-gray-300 text-center mb-4 font-semibold">
        Confira os últimos resultados das loterias mais populares e aproveite
        para criar jogos únicos e personalizados do seu jeito.
      </p>
      <p class="text-base text-gray-300 text-center mb-8 font-semibold">
        Experimente, simule e aumente suas chances de sorte!
      </p>

      <!-- Seção de Regras e Limites -->
      <div v-if="gamesInfo" class="bg-gray-800/50 p-6 rounded-xl shadow-lg mb-12 border border-white/10">
        <h2 class="text-2xl font-bold text-teal-400 mb-4 text-center">Regras e Limites do Gerador</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
          <div>
            <h3 class="font-semibold text-white">Limite Diário</h3>
            <p class="text-gray-300">Você pode gerar até <span class="font-bold text-white">{{ gamesInfo.daily_limit }}</span> jogos por dia.</p>
          </div>
          <div>
            <h3 class="font-semibold text-white">Geração Inteligente</h3>
            <ul class="text-gray-300">
              <li v-for="(rule, key) in gamesInfo.rules" :key="key">{{ rule }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center">
        <p class="text-2xl">Carregando resultados...</p>
      </div>

      <div v-else-if="validResults.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <ResultCard
          v-for="result in validResults"
          :key="result.game.slug"
          :title="result.game.name"
          :numbers="result.contest.numbers.map(Number)"
          :contest="result.contest.draw_number"
          :date="result.contest.draw_date"
          :colorClass="getGameDetails(result.game.slug).colorClass"
          :routeName="getGameDetails(result.game.slug).routeName"
        />
      </div>

      <div v-else class="text-center">
        <p class="text-xl text-gray-400">Nenhum resultado recente para exibir.</p>
        <p class="text-md text-gray-500">Parece que ainda não há concursos no sistema.</p>
      </div>
    </div>
  </main>
</template>