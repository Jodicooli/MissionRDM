import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHintsSolutions } from '@/logic/hintsAndSolutions/useHintsSolutions.js'

// Mock the level-specific hints modules
vi.mock('@/logic/hintsAndSolutions/level1/useHintsSolutionsLvl1.js', () => ({
  useHintsSolutionsLvl1: vi.fn(() => ({
    getCurrentStep: vi.fn(),
    currentHint: { value: 'level1-hint' },
    currentSolution: { value: 'level1-solution' }
  }))
}))

vi.mock('@/logic/hintsAndSolutions/level2/useHintsSolutionsLvl2.js', () => ({
  useHintsSolutionsLvl2: vi.fn(() => ({
    getCurrentStep: vi.fn(),
    currentHint: { value: 'level2-hint' },
    currentSolution: { value: 'level2-solution' }
  }))
}))

describe('Hints and Solutions Logic Router', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('routes to level 1 hints and solutions', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/1/hints' })
    
    const result = useHintsSolutions()
    expect(result.getCurrentStep).toBeDefined()
    expect(result.currentHint.value).toBe('level1-hint')
  })

  it('routes to level 2 hints and solutions', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/2/hints' })
    
    const result = useHintsSolutions()
    expect(result.getCurrentStep).toBeDefined()
    expect(result.currentHint.value).toBe('level2-hint')
  })

  it('handles level 3 with fallback message', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/3/hints' })
    
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    
    const result = useHintsSolutions()
    
    expect(consoleSpy).toHaveBeenCalledWith('Hints and solutions for level 3 are not implemented yet.')
    expect(result.currentHint()).toBe('Hints and solutions for level 3 are not implemented yet.')
    expect(result.currentSolution()).toBe('Solutions for level 3 are not implemented yet.')
    
    consoleSpy.mockRestore()
  })

  it('returns undefined for unknown levels', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/level/999/hints' })
    
    const result = useHintsSolutions()
    
    expect(result).toBeUndefined()
  })

  it('returns undefined for non-level paths', () => {
    global.mockRouter.useRoute.mockReturnValue({ path: '/home' })
    
    const result = useHintsSolutions()
    
    expect(result).toBeUndefined()
  })
})