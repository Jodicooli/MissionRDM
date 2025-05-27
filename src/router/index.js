import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'

const routes = [
  { path: '/', component: StartScreen },
  { path: '/introduction', component: () => import('@/pages/Introduction/Introduction.vue') },
  { path: '/tutorial', component: () => import('@/pages/Introduction/Tutorial.vue') },
  { path: '/level/1', component: () => import('@/pages/Level1/Level1.vue') },
  { path: '/level/2', component: () => import('@/pages/Level2/Level2.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
