import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameLogicLvl1 } from '@/logic/level1/gameLogicLvl1.js'
import { useGameInfo } from '@/store/gameInfo.js'

describe('Game Logic Level 1', () => {
  let store, setFeedback, logic

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameInfo()
    setFeedback = vi.fn()
    logic = useGameLogicLvl1(setFeedback)
    vi.clearAllMocks()
  })

  it('handles hint code (8)', () => {
    logic.handleCodeInput('8')
    expect(store.firstHintFound).not.toBe(false)
    expect(store.firstHintFound).toBe(true)
    expect(setFeedback).toHaveBeenCalledWith('success', '')
  })

  it('handles count code (4) after hint', () => {
    store.firstHintFound = true
    logic.handleCodeInput('4')
    expect(store.enteredCodes).toContain('4')
    expect(store.enteredCodes).toContain('8')
  })

  it('handles second hint code (29)', () => {
    logic.handleCodeInput('29')
    expect(store.secondHintFound).toBe(true)
    expect(store.activeMessage.name).toBe('Santiago')
  })

  it('rejects duplicate codes', () => {
    store.enteredCodes = ['8']
    logic.handleCodeInput('8')
    expect(setFeedback).toHaveBeenCalledWith('error', '')
  })

  it('progresses through scenario images', () => {
    store.currentScenarioImage = 'updated'
    logic.handleCodeInput('21')
    expect(store.currentScenarioImage).toBe('third')
    
    logic.handleCodeInput('26')
    expect(store.currentScenarioImage).toBe('final')
    
    logic.handleCodeInput('28')
    expect(store.currentScenarioImage).toBe('congrats')
  })

  it('advances to level 2', () => {
    store.currentScenarioImage = 'congrats'
    logic.handleCodeInput('88')
    
    expect(store.level).toBe(2)
    expect(global.mockRouter.push).toHaveBeenCalledWith('/level/2')
  })
})