import { defineStore } from 'pinia'

export const useGameInfo = defineStore('game', {
  state: () => ({
    playerName: '',
    level: 1,
    progress: [],
    hintsUsed: {}
  })
})
