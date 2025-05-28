import Introduction from '@/pages/Introduction/Introduction.vue'
import Tutorial from '@/pages/Introduction/Tutorial.vue'
import StartScreen from '@/pages/StartScreen.vue'
import Level1 from '@/pages/Level1/Level1.vue'
import Level2 from '@/pages/Level2/Level2.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router