import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRoadmapStore } from '@/store/roadmap.js'

describe('Roadmap Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useRoadmapStore()
  })

  it('initializes with 6 steps', () => {
    expect(store.roadmapSteps).toHaveLength(6)
    expect(store.shouldFlash).toBe(false)
  })

  it('adds entries correctly', () => {
    store.initializeSteps()
    store.addEntry('step1', 'step1_test')
    
    const step1 = store.roadmapSteps.find(s => s.key === 'step1')
    expect(step1.items.some(item => item.key === 'step1_test')).toBe(true)
    expect(store.shouldFlash).toBe(true)
  })

  it('prevents duplicate entries', () => {
    store.initializeSteps()
    store.addEntry('step1', 'step1_test')
    store.addEntry('step1', 'step1_test')
    
    const step1 = store.roadmapSteps.find(s => s.key === 'step1')
    const count = step1.items.filter(item => item.key === 'step1_test').length
    expect(count).toBe(1)
  })

  it('resets correctly', () => {
    store.initializeSteps()
    store.addEntry('step1', 'step1_test')
    store.resetRoadmap()
    
    const step1 = store.roadmapSteps.find(s => s.key === 'step1')
    expect(step1.items.some(item => item.key === 'step1_test')).toBe(false)
  })

  it('reset to initial state', () => {
    store.initializeSteps()
    store.addEntry('step1', 'step1_test')
    store.resetToInitial()
    
    const step1 = store.roadmapSteps.find(s => s.key === 'step1')
    expect(step1.items).toHaveLength(6)
  })
})