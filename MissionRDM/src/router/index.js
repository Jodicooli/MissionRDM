import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'

const routes = [
  { path: '/', component: StartScreen },
  { path: '/level/1', component: () => import('@/pages/Level1.vue') },
  { path: '/tutorial', component: () => import('@/pages/Tutorial.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
