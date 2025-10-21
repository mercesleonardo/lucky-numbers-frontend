import { ref, reactive } from 'vue'
import { lotteryService } from '../services/lotteryService'

// --- Tipos ---
export interface Prize {
  tier: string;
  description: string;
  winners: number;
  prize_amount: number;
}

export interface Contest {
  contest: {
    draw_number: number
    draw_date: string
    numbers: string[]
    prizes: Prize[]
  }
  game: {
    name: string
    slug: string
  }
}

export interface SessionStats {
  generated_today: number
  remaining: number
}

export interface GameInfo {
  name: string;
  pick_count: number;
  number_range: string;
  total_numbers: number;
}

export interface GamesInfoResponse {
  supported_games: { [key: string]: GameInfo };
  daily_limit: number;
  rules: { [key: string]: string };
}

interface GeneratedGames {
  megasena: number[][]
  lotofacil: number[][]
  quina: number[][]
  [key: string]: number[][]
}

// --- Estado Compartilhado (Singleton) ---
// Declarado fora da função para ser único em toda a aplicação
const loading = ref<boolean>(false)
const loadingContest = ref<boolean>(false)
const error = ref<any | null>(null)
const contests = ref<Contest[]>([])
const latestContest = ref<Contest | null>(null)
const sessionStats = ref<SessionStats | null>(null)
const gamesInfo = ref<GamesInfoResponse | null>(null)
const generatedGames = reactive<GeneratedGames>({
  megasena: [],
  lotofacil: [],
  quina: [],
})

// --- Composable Function ---
export function useLottery() {

  // Carregar últimos concursos (plural)
  const loadLatestContests = async () => {
    loading.value = true
    error.value = null
    try {
      contests.value = await lotteryService.getLatestContests()
    } catch (err: any) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Carregar último concurso de um jogo específico (singular)
  const loadLatestContest = async (gameSlug: string) => {
    loadingContest.value = true
    error.value = null
    try {
      latestContest.value = await lotteryService.getLatestContest(gameSlug);
    } catch (err: any) {
      error.value = err
    } finally {
      loadingContest.value = false
    }
  }

  // Gerar jogos
  const generateGames = async (
    gameSlug: string,
    options: { count: number },
  ) => {
    loading.value = true
    error.value = null
    try {
      const result = await lotteryService.generateGames(gameSlug, options)
      generatedGames[gameSlug] = result.games
      sessionStats.value = result.session_stats
      return result
    } catch (err: any) {
      if (err.response && err.response.data) {
        error.value = err.response.data;
        if (err.response.data.generated_today !== undefined) {
          sessionStats.value = {
            generated_today: err.response.data.generated_today,
            remaining: err.response.data.remaining,
          }
        }
      } else {
        error.value = err;
      }
      throw err;
    } finally {
      loading.value = false
    }
  }

  // Carregar estatísticas da sessão
  const loadSessionStats = async () => {
    try {
      sessionStats.value = await lotteryService.getSessionStats();
    } catch (err: any) {
      error.value = err;
    }
  }

  // Verificar números
  const checkUserNumbers = async (gameSlug: string, numbers: number[]) => {
    loading.value = true
    error.value = null
    try {
      return await lotteryService.checkNumbers(gameSlug, numbers)
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Carregar informações dos jogos
  const loadGamesInfo = async () => {
    try {
      gamesInfo.value = await lotteryService.getGamesInfo()
    } catch (err: any) {
      error.value = err
    }
  }

  // Retorna o estado compartilhado e as funções para manipulá-lo
  return {
    loading,
    loadingContest,
    error,
    contests,
    latestContest,
    sessionStats,
    gamesInfo,
    generatedGames,
    loadLatestContests,
    loadLatestContest,
    generateGames,
    loadSessionStats,
    checkUserNumbers,
    loadGamesInfo,
  }
}
