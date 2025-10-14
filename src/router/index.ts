import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/megasena',
      name: 'megasena',
      component: () => import('../views/MegaSenaView.vue'),
    },
    {
      path: '/quina',
      name: 'quina',
      component: () => import('../views/QuinaView.vue'),
    },
    {
      path: '/lotofacil',
      name: 'lotofacil',
      component: () => import('../views/LotofacilView.vue'),
    },
  ],
})

export default router
