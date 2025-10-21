import api from './api'

// Interfaces para tipagem
interface GameOptions {
  count?: number
}

export const lotteryService = {
  // Obter últimos concursos
  async getLatestContests() {
    const response = await api.get('/contests/latest')
    return response.data
  },

  // Obter último concurso de um jogo específico
  async getLatestContest(gameSlug: string) {
    const response = await api.get(`/contests/latest/${gameSlug}`)
    return response.data
  },

  // Verificar se concurso existe
  async contestExists(gameSlug: string, drawNumber: number) {
    const response = await api.get(`/contests/exists/${gameSlug}/${drawNumber}`)
    return response.data
  },

  // Verificar números do usuário
  async checkNumbers(gameSlug: string, numbers: number[]) {
    const response = await api.post(`/contests/check-numbers/${gameSlug}`, {
      numbers,
    })
    return response.data
  },

  // Obter informações dos jogos
  async getGamesInfo() {
    const response = await api.get('/games/info')
    return response.data
  },

  // Obter estatísticas da sessão
  async getSessionStats() {
    const response = await api.get('/games/session-stats')
    return response.data
  },

  // Gerar jogos inteligentes
  async generateGames(gameSlug: string, options: GameOptions = {}) {
    const { count = 1 } = options
    const response = await api.post(`/games/generate/${gameSlug}`, {
      count,
    })
    return response.data
  },
}
