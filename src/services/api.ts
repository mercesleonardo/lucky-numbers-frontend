import axios from 'axios'

// Configuração base da API
const api = axios.create({
  // Usa a variável de ambiente VITE_API_BASE_URL, com um fallback para o endereço local.
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Interceptor para respostas
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response ?.data || error.message)
    return Promise.reject(error)
  }
)

export default api
