import { createRouter, createWebHistory } from 'vue-router'
import StartScreen from '@/pages/StartScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', component: StartScreen },
  { path: '/introduction', component: () => import('@/pages/introduction/Introduction.vue') },
  { path: '/tutorial', component: () => import('@/pages/introduction/Tutorial.vue') },
  { path: '/level/1', component: () => import('@/pages/level1/Level1.vue') },
  { path: '/level/2', component: () => import('@/pages/level2/Level2.vue') },
 ]
})

export default router
