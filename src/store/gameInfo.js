import { defineStore } from 'pinia'
import { checkUpdateScenarioImage } from '@/logic/level1/gameLogicLvl1.js'

let overlayId = 0

export const useGameInfo = defineStore('game', {
  state: () => ({
    playerName: '',
    level: 1,
    progress: [],
    hintsUsed: {},
    
    showHintModal: false,
    hintModalType: 'clues',
    enteredCodes: [],
    
    overlayNotes: [],
    overlayNotesOpen: false,
    activeMessage: null,
    activeRiddle: null,
    riddleSolved: false,
    
    firstHintFound: false,
    secondHintFound: false,
    callableCharacters: {
      Santiago: false,
      Inès: false,
      Jack: false
    },
    activeCall: null,
    roadmap: {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: []
    },
    currentScenarioImage: 'default',
    feedback: {
      type: '',
      message: ''
    },
    
    // Add congratulations modal state
    showCongratsModal: false
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
    showHints(type) {
      this.hintModalType = type
      this.showHintModal = true
    },
    closeHints() {
      this.showHintModal = false
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
      if (this.overlayNotesOpen) {
        return
      }
      const id = overlayId++
      const fullNote = typeof note === 'string'
        ? { id, type: 'text', text: note }
        : { ...note, id }
      this.overlayNotesOpen = true
      this.overlayNotes.push(fullNote)
    },  
    removeOverlay(id) {
      this.overlayNotes = this.overlayNotes.filter(n => n.id !== id)
      this.overlayNotesOpen = false
    },
    markRoadmap(stepText) {
      const step = this.level
      if (!this.roadmap[step].includes(stepText)) {
        this.roadmap[step].push(stepText)
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
      this.firstHintFound = false
      this.SecondHintFound = false
      this.currentScenarioImage = 'default'
      this.feedback.type = ''
      this.feedback.message = ''
      this.showCongratsModal = false 
      this.callableCharacters = {
        Santiago: false,
        Inès: false,
        Jack: false
      }
    }
  }
})