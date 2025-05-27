import { defineStore } from 'pinia'
import { checkUpdateScenarioImage } from '@/logic/level1/gameLogicLvl1.js'

let overlayId = 0

export const useGameInfo = defineStore('game', {
  state: () => ({
    playerName: '',
    level: 1,
    progress: [],
    hintsUsed: {},
    enteredCodes: [], 
    overlayNotes: [],  
    activeMessage: null,
    activeRiddle: null,
    riddleSolved: false, 
    fristHintFound: false,
    callableCharacters: {
      Santiago: false,
      Inès: false,
      Jack: false
    },
    activeCall: null,
    roadmap: {
      1: []
    },
    currentScenarioImage: 'default',
    feedback: {
      type: '',
      message: ''
    }
  }),

  actions: {
    markRiddleAsSolved() {
      this.riddleSolved = true
      if (this.level == 1) {
        checkUpdateScenarioImage()
      }
    },
    setCharCallable(charKey, value) {
      this.callableCharacters[charKey] = value
    },
    startCall(name, avatar, message) {
      this.activeCall = { name, avatar, body: message }
    },
    getLvl() {
      return this.level
    },
    endCall() {
      this.activeCall = null
    },
    isCharCallable(charKey) {
      return this.callableCharacters[charKey] || false
    },
    markMessageAsRead() {
      this.activeMessage = null
      this.activeRiddle = null
    },
    addCode(code) {
      if (!this.enteredCodes.includes(code)) {
        this.enteredCodes.push(code)
      }
    },
    showOverlay(note) {
      const id = overlayId++
      const fullNote = typeof note === 'string'
        ? { id, type: 'text', text: note }
        : { ...note, id }

      this.overlayNotes.push(fullNote)
    },
    removeOverlay(id) {
      this.overlayNotes = this.overlayNotes.filter(n => n.id !== id)
    },
    markRoadmap(stepText) {
      if (!this.roadmap[1].includes(stepText)) {
        this.roadmap[1].push(stepText)
      }
    },
    setFeedback(type, message) {
      this.feedback.type = type
      this.feedback.message = message

      setTimeout(() => {
        this.feedback.type = ''
        this.feedback.message = ''
      }, 2000)
    },
    resetAfterLevel() {
      this.enteredCodes = []
      this.overlayNotes = []
      this.activeMessage = null
      this.activeRiddle = null
      this.riddleSolved = false
      this.fristHintFound = false
      this.currentScenarioImage = 'default'
      this.feedback.type = ''
      this.feedback.message = ''
      this.callableCharacters = {
        Santiago: false,
        Inès: false,
        Jack: false
      }
    }
  }
})
