import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useShowcaseStore } from '../store/useShowcaseStore'

gsap.registerPlugin(ScrollTrigger)

/** A single ScrollTrigger is the source of truth for both scene and UI. */
export const createScrollTimeline = () => {
  const state = { progress: 0 }
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#story', start: 'top top', end: 'bottom bottom', scrub: 1.15,
      onUpdate: (self) => {
        const progress = self.progress
        const section = Math.min(6, Math.floor(progress * 7))
        useShowcaseStore.getState().setScroll(progress, section)
        useShowcaseStore.getState().setExploded(progress > .68 && progress < .86)
      },
    },
  })
  timeline.to(state, { progress: 1, duration: 1 })
  return () => timeline.kill()
}
