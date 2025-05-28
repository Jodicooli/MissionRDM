import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameInfo } from '@/store/gameInfo'

describe('GameInfo Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameInfo()
  })

  it('initializes with correct defaults', () => {
    expect(store.level).toBe(1)
    expect(store.enteredCodes).toEqual([])
    expect(store.riddleSolved).toBe(false)
    expect(store.callableCharacters.Santiago).toBe(false)
  })

  it('manages codes correctly', () => {
    store.addCode('123')
    expect(store.enteredCodes).toContain('123')
    // duplicate code should not be added again
    store.addCode('123') 
    expect(store.enteredCodes.filter(c => c === '123')).toHaveLength(1)
  })

  it('handles riddle state', () => {
    store.markRiddleAsSolved()
    expect(store.riddleSolved).toBe(true)
  })

  it('manages character calls', () => {
    store.setCharCallable('Santiago', true)
    expect(store.isCharCallable('Santiago')).toBe(true)
    
    store.startCall('Santiago', 'avatar.png', 'message')
    expect(store.activeCall.name).toBe('Santiago')

    store.startCall('Inès', 'avatar2.png', 'another message')
    expect(store.activeCall.name).not.toBe('Santiago')
    expect(store.activeCall.name).toBe('Inès')
    
    store.endCall()
    expect(store.activeCall).toBeNull()
  })

  it('resets after level', () => {
    store.enteredCodes = ['123']
    store.riddleSolved = true
    store.resetAfterLevel()
    
    expect(store.enteredCodes).toEqual([])
    expect(store.riddleSolved).toBe(false)
  })

  it('gets current level', () => {
    expect(store.getLvl()).toBe(1)
    store.level = 2
    expect(store.getLvl()).toBe(2)
  })

  it('manages feedback messages', () => {
    store.setFeedback('success', 'Well done!')
    expect(store.feedback.type).toBe('success')
    expect(store.feedback.message).toBe('Well done!')

    store.setFeedback('error', 'Something went wrong.')
    expect(store.feedback.type).toBe('error')
    expect(store.feedback.message).toBe('Something went wrong.')
  })

  it('manage overlay notes', () => {
    store.showOverlay('Test note')
    const lastOverlay = store.overlayNotes[store.overlayNotes.length - 1]
    expect(store.overlayNotes).toContainEqual({
      id: lastOverlay.id,
      type: 'text',
      text: 'Test note'
    })

    // Remove by ID, not by text
    store.removeOverlay(lastOverlay.id)
    expect(store.overlayNotes).toHaveLength(0)
  })

  it('Feedback display', () => {
    vi.useFakeTimers()
  
    store.setFeedback('success', 'Test success message')
    expect(store.feedback.type).toBe('success')
    expect(store.feedback.message).toBe('Test success message')

    vi.advanceTimersByTime(2000)
    expect(store.feedback.type).toBe('')
    expect(store.feedback.message).toBe('')
  })

  it('manages hints', () => {
    store.showHints('clues')
    expect(store.showHintModal).toBe(true)
    expect(store.hintModalType).not.toBe('solutions')
    expect(store.hintModalType).toBe('clues')

    store.closeHints()
    expect(store.showHintModal).toBe(false)
  })
})