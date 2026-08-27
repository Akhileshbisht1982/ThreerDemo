import { create } from 'zustand'

export type HotspotId = 'display' | 'crown' | 'sensor' | null
type ShowcaseState = {
  scrollProgress: number
  currentSection: number
  exploded: boolean
  selectedHotspot: HotspotId
  setScroll: (progress: number, section: number) => void
  setExploded: (value: boolean) => void
  selectHotspot: (id: HotspotId) => void
}

export const useShowcaseStore = create<ShowcaseState>((set) => ({
  scrollProgress: 0, currentSection: 0, exploded: false, selectedHotspot: null,
  setScroll: (scrollProgress, currentSection) => set({ scrollProgress, currentSection }),
  setExploded: (exploded) => set({ exploded }),
  selectHotspot: (selectedHotspot) => set({ selectedHotspot }),
}))
