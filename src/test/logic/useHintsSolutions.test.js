import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHintsSolutions } from '@/logic/hintsAndSolutions/level1/useHintsSolutions.js'
import { useGameInfo } from '@/store/gameInfo.js'

// Mock the level 1 composable
vi.mock('@/logic/hintsAndSolutions/level1/useHintsSolutions.js', () => ({
  useHintsSolutions: vi.fn(() => ({
    currentHint: { value: 'Level 1 hint' },
    currentSolution: { value: 'Level 1 solution' }
  }))
}))

describe('useHintsSolutions', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameInfo()
    vi.clearAllMocks()
  })

  it('returns level 1 composable when game level is 1', () => {
    store.level = 1
    
    const result = useHintsSolutions()
    
    expect(result).toBeDefined()
    expect(result.currentHint.value).toBe('Level 1 hint')
    expect(result.currentSolution.value).toBe('Level 1 solution')
  })

  it('returns level 2 placeholder functions when game level is 2', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    store.level = 2
    
    const result = useHintsSolutions()
    
    expect(consoleSpy).toHaveBeenCalledWith('Hints and solutions for level 2 are not implemented yet.')
    expect(result.currentHint()).toBe('Hints and solutions for level 2 are not implemented yet.')
    expect(result.currentSolution()).toBe('Solutions for level 2 are not implemented yet.')
    
    consoleSpy.mockRestore()
  })

  it('returns undefined for unsupported levels', () => {
    store.level = 3
    
    const result = useHintsSolutions()
    
    expect(result).toBeUndefined()
  })

  it('handles when getLvl returns null or undefined', () => {
    // Simulate getLvl returning undefined
    vi.spyOn(store, 'getLvl').mockReturnValue(undefined)
    
    const result = useHintsSolutions()
    
    expect(result).toBeUndefined()
  })
})