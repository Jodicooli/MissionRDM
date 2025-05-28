import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGameLogic } from '@/logic/useGameLogic.js'

describe('Game Logic Router', () => {
  let setFeedback

  beforeEach(() => {
    setActivePinia(createPinia()) 
    setFeedback = vi.fn()
    vi.clearAllMocks()
  })

  it('routes to level 1 logic', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/1' })
    
    const { handleCodeInput } = useGameLogic(setFeedback)
    expect(handleCodeInput).toBeDefined()
  })

  it('handles unknown levels', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/999' })
    
    const { handleCodeInput } = useGameLogic(setFeedback)
    handleCodeInput('test')
    
    expect(setFeedback).toHaveBeenCalledWith('error', 'No logic defined for this level.')
  })
})