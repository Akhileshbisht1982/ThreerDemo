import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useShowcaseStore } from '../store/useShowcaseStore'

type CameraFrame = { p: [number, number, number]; t: [number, number, number] }
const keyframes: CameraFrame[] = [
  { p: [0, .3, 7], t: [0, .2, 0] }, { p: [4, 1, 5], t: [0, .35, 0] },
  { p: [-3.7, 1.5, 3.6], t: [0, .35, 0] }, { p: [1.8, 2.9, 2.8], t: [0, .35, 0] },
  { p: [0.2, .8, 3.2], t: [0, .35, 0] }, { p: [3.8, 1, 5.6], t: [0, .35, 0] },
  { p: [0, .5, 7], t: [0, .2, 0] },
]

export function CameraRig() {
  const { camera, size } = useThree()
  const progress = useShowcaseStore((s) => s.scrollProgress)
  const target = useMemo(() => new THREE.Vector3(), [])
  const desired = useMemo(() => new THREE.Vector3(), [])
  useFrame((_, delta) => {
    const scaled = Math.min(progress * (keyframes.length - 1), keyframes.length - 1.001)
    const i = Math.floor(scaled), mix = scaled - i, a = keyframes[i], b = keyframes[i + 1] ?? a
    const mobile = size.width < 700 ? 1.28 : 1
    desired.set(...a.p).lerp(new THREE.Vector3(...b.p), mix).multiplyScalar(mobile)
    target.set(...a.t).lerp(new THREE.Vector3(...b.t), mix)
    camera.position.lerp(desired, 1 - Math.exp(-delta * 3.2))
    camera.lookAt(target)
  })
  return null
}
