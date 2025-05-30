import { createRouter, createWebHistory } from 'vue-router'
import Introduction from '@/pages/introduction/Introduction.vue'
import Tutorial from '@/pages/introduction/Tutorial.vue'
import StartScreen from '@/pages/StartScreen.vue'
import Level1 from '@/pages/level1/Level1.vue' 
import Level2 from '@/pages/level2/Level2.vue'
import Level3 from '@/pages/level3/Level3.vue'

const routes = [
  {
    path: '/',
    name: 'StartScreen',
    component: StartScreen
  },
  {
    path: '/introduction',
    name: 'Introduction',
    component: Introduction
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial
  },
  {
    path: '/level/1',
    name: 'Level1',
    component: Level1
  },
  {
    path: '/level/2',
    name: 'Level2',
    component: Level2
  },
  {
    path: '/level/3',
    name: 'Level3',
    component: Level3
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router