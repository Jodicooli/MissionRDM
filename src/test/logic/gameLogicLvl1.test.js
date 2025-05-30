import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameLogicLvl1, checkUpdateScenarioImage } from '@/logic/level1/gameLogicLvl1.js'
import { useGameInfo } from '@/store/gameInfo.js'
import { useRoadmapStore } from '@/store/roadmap.js'

// Mock the router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

// Mock i18n with a mutable locale ref
const mockLocale = { value: 'en' }
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn((key) => key), // Return the key as translation
    locale: mockLocale
  })
}))

// Mock sound utilities
vi.mock('@/utils/playSound', () => ({
  playSound: vi.fn()
}))

describe('Game Logic Level 1', () => {
  let store, roadmapStore, setFeedback, logic

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameInfo()
    roadmapStore = useRoadmapStore()
    
    // Mock store methods that need to be spies
    store.showOverlay = vi.fn()
    store.resetAfterLevel = vi.fn()
    store.setCharCallable = vi.fn()
    roadmapStore.addEntry = vi.fn()
    
    setFeedback = vi.fn()
    logic = useGameLogicLvl1(setFeedback)
    
    // Reset locale to English for each test
    mockLocale.value = 'en'
    
    vi.clearAllMocks()
  })

  describe('hint code (8) handling', () => {
    it('handles hint code (8) when count code not entered', () => {
      logic.handleCodeInput('8')
      expect(store.firstHintFound).toBe(true)
      expect(setFeedback).toHaveBeenCalledWith('success', '')
      expect(store.showOverlay).toHaveBeenCalledWith({
        type: 'image',
        src: expect.any(String)
      })
    })

    it('handles hint code (8) in French locale', () => {
      mockLocale.value = 'fr'
      logic.handleCodeInput('8')
      expect(store.firstHintFound).toBe(true)
      expect(store.showOverlay).toHaveBeenCalledWith({
        type: 'image',
        src: expect.any(String)
      })
    })

    it('does not handle hint code (8) when count code already entered', () => {
      store.enteredCodes = ['4']
      logic.handleCodeInput('8')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
      expect(store.firstHintFound).not.toBe(true)
    })
  })

  describe('count code (4) handling', () => {
    it('handles count code (4) after hint', () => {
      store.firstHintFound = true
      logic.handleCodeInput('4')
      expect(store.enteredCodes).toContain('4')
      expect(store.enteredCodes).toContain('8')
      expect(store.showOverlay).toHaveBeenCalledWith({
        type: 'image',
        src: expect.any(String)
      })
      expect(roadmapStore.addEntry).toHaveBeenCalledWith('step1', 'step1_3')
    })

    it('handles count code (4) with overlay notes open', () => {
      store.firstHintFound = true
      store.overlayNotesOpen = true
      logic.handleCodeInput('4')
      expect(store.overlayNotesOpen).toBe(false)
    })

    it('rejects count code (4) when hint not found', () => {
      store.firstHintFound = false
      logic.handleCodeInput('4')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
      expect(store.enteredCodes).not.toContain('4')
    })
  })

  describe('second hint code (29) handling', () => {
    it('handles second hint code (29) when riddle not solved', () => {
      store.riddleSolved = false
      logic.handleCodeInput('29')
      expect(store.secondHintFound).toBe(true)
      expect(store.activeMessage.name).toBe('Santiago')
      expect(store.activeMessage.from).toBe('S15')
      expect(store.activeMessage.image).toBe('santiago')
    })

    it('rejects second hint code (29) when riddle already solved', () => {
      store.riddleSolved = true
      logic.handleCodeInput('29')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
      expect(store.secondHintFound).not.toBe(true)
    })

    it('handles second hint code (29) when riddle solved but not in entered codes', () => {
      store.riddleSolved = true
      store.enteredCodes = []
      logic.handleCodeInput('29')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })
  })

  describe('scenario progression', () => {
    it('handles final code (21) in updated scenario', () => {
      store.currentScenarioImage = 'updated'
      logic.handleCodeInput('21')
      expect(store.currentScenarioImage).toBe('third')
      expect(store.enteredCodes).toContain('29')
      expect(store.enteredCodes).toContain('21')
      expect(store.riddleSolved).toBe(false)
      expect(setFeedback).toHaveBeenCalledWith('success', '')
    })

    it('rejects final code (21) in wrong scenario', () => {
      store.currentScenarioImage = 'initial'
      logic.handleCodeInput('21')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
      expect(store.currentScenarioImage).toBe('initial')
    })

    it('handles last code (26) in third scenario', () => {
      store.currentScenarioImage = 'third'
      logic.handleCodeInput('26')
      expect(store.enteredCodes).toContain('26')
      expect(store.currentScenarioImage).toBe('final')
      expect(setFeedback).toHaveBeenCalledWith('success', '')
      expect(store.setCharCallable).toHaveBeenCalledWith('Santiago', true)
    })

    it('rejects last code (26) in wrong scenario', () => {
      store.currentScenarioImage = 'initial'
      logic.handleCodeInput('26')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })

    it('handles finish code (28) in final scenario', () => {
      store.currentScenarioImage = 'final'
      logic.handleCodeInput('28')
      expect(store.enteredCodes).toContain('28')
      expect(store.currentScenarioImage).toBe('congrats')
      expect(setFeedback).toHaveBeenCalledWith('success', '')
      expect(store.setCharCallable).toHaveBeenCalledWith('Santiago', false)
      expect(roadmapStore.addEntry).toHaveBeenCalledWith('step1', 'step1_2')
    })

    it('rejects finish code (28) in wrong scenario', () => {
      store.currentScenarioImage = 'initial'
      logic.handleCodeInput('28')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })
  })

  describe('level completion', () => {
    it('handles continue code (88) in congrats scenario', () => {
      store.currentScenarioImage = 'congrats'
      logic.handleCodeInput('88')
      expect(store.enteredCodes).toContain('88')
      expect(store.showCongratsModal).toBe(true)
      expect(setFeedback).toHaveBeenCalledWith('success', '')
    })

    it('rejects continue code (88) in wrong scenario', () => {
      store.currentScenarioImage = 'initial'
      logic.handleCodeInput('88')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
      expect(store.showCongratsModal).not.toBe(true)
    })
  })

  describe('duplicate code handling', () => {
    it('rejects duplicate codes', () => {
      store.enteredCodes = ['8']
      logic.handleCodeInput('8')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })

    it('rejects any duplicate code', () => {
      store.enteredCodes = ['21', '26']
      logic.handleCodeInput('21')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })
  })

  describe('invalid codes', () => {
    it('rejects invalid codes', () => {
      logic.handleCodeInput('999')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })

    it('rejects empty codes', () => {
      logic.handleCodeInput('')
      expect(setFeedback).toHaveBeenCalledWith('error', '')
    })
  })

  describe('navigation and completion', () => {
    it('continues to level 2 from modal', () => {
      store.showCongratsModal = true
      logic.continueToLevel2()
      expect(store.level).toBe(2)
      expect(store.resetAfterLevel).toHaveBeenCalled()
      expect(store.showCongratsModal).toBe(false)
      expect(mockPush).toHaveBeenCalledWith('/level/2')
    })
  })

  describe('complete progression flow', () => {
    it('progresses through complete sequence', () => {
      // Step 1: Hint
      logic.handleCodeInput('8')
      expect(store.firstHintFound).toBe(true)
      
      // Step 2: Count
      logic.handleCodeInput('4')
      expect(store.enteredCodes).toContain('4')
      expect(store.enteredCodes).toContain('8')
      
      // Step 3: Second hint
      logic.handleCodeInput('29')
      expect(store.secondHintFound).toBe(true)
      
      // Simulate riddle being solved
      store.riddleSolved = true
      checkUpdateScenarioImage()
      expect(store.currentScenarioImage).toBe('updated')
      
      // Step 4: Final code
      logic.handleCodeInput('21')
      expect(store.currentScenarioImage).toBe('third')
      
      // Step 5: Last code
      logic.handleCodeInput('26')
      expect(store.currentScenarioImage).toBe('final')
      
      // Step 6: Finish code
      logic.handleCodeInput('28')
      expect(store.currentScenarioImage).toBe('congrats')
      
      // Step 7: Continue code
      logic.handleCodeInput('88')
      expect(store.showCongratsModal).toBe(true)
    })
  })
})

describe('checkUpdateScenarioImage function', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameInfo()
  })

  it('updates scenario image when conditions are met', () => {
    store.enteredCodes = ['8', '4']
    store.riddleSolved = true
    store.activeMessage = { some: 'message' }
    store.activeRiddle = { some: 'riddle' }
    
    checkUpdateScenarioImage()
    
    expect(store.currentScenarioImage).toBe('updated')
    expect(store.activeMessage).toBe(null)
    expect(store.activeRiddle).toBe(null)
  })

  it('does not update scenario image when codes missing', () => {
    store.enteredCodes = ['8'] // Missing '4'
    store.riddleSolved = true
    store.currentScenarioImage = 'initial'
    
    checkUpdateScenarioImage()
    
    expect(store.currentScenarioImage).toBe('initial')
  })

  it('does not update scenario image when riddle not solved', () => {
    store.enteredCodes = ['8', '4']
    store.riddleSolved = false
    store.currentScenarioImage = 'initial'
    
    checkUpdateScenarioImage()
    
    expect(store.currentScenarioImage).toBe('initial')
  })

  it('does not update scenario image when neither condition met', () => {
    store.enteredCodes = []
    store.riddleSolved = false
    store.currentScenarioImage = 'initial'
    
    checkUpdateScenarioImage()
    
    expect(store.currentScenarioImage).toBe('initial')
  })
})