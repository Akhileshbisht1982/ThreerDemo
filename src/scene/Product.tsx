import { Float, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useShowcaseStore } from '../store/useShowcaseStore'
import { Hotspot } from './Hotspot'

/** GLB-ready component: replace these premium procedural parts with useGLTF('/product.glb'). */
type ProductProps = { showHotspots?: boolean }

export function Product({ showHotspots = false }: ProductProps) {
  const root = useRef<THREE.Group>(null)
  const screen = useRef<THREE.Group>(null), battery = useRef<THREE.Group>(null), sensors = useRef<THREE.Group>(null), frame = useRef<THREE.Group>(null)
  const progress = useShowcaseStore((s) => s.scrollProgress)
  const exploded = useShowcaseStore((s) => s.exploded)
  const metal = useMemo(() => new THREE.MeshStandardMaterial({ color: '#aeb4bd', metalness: .97, roughness: .22 }), [])
  useFrame((state, delta) => {
    if (!root.current) return
    root.current.rotation.y = progress * Math.PI * 3.25 + Math.sin(state.clock.elapsedTime * .35) * .06
    root.current.rotation.x = Math.sin(progress * Math.PI * 2) * .16
    const x = exploded ? 1 : 0
    if (screen.current) screen.current.position.y = THREE.MathUtils.damp(screen.current.position.y, x * .72, 5, delta)
    if (battery.current) battery.current.position.y = THREE.MathUtils.damp(battery.current.position.y, -x * .68, 5, delta)
    if (sensors.current) sensors.current.position.z = THREE.MathUtils.damp(sensors.current.position.z, -x * .6, 5, delta)
    if (frame.current) frame.current.scale.x = THREE.MathUtils.damp(frame.current.scale.x, 1 + x * .16, 5, delta)
  })
  return <Float speed={1.25} rotationIntensity={.08} floatIntensity={.2}>
    <group ref={root} scale={1.22}>
      <group ref={frame}><RoundedBox args={[2.35, 3.25, .52]} radius={.28} smoothness={5} material={metal} castShadow receiveShadow /></group>
      <group ref={sensors} position={[0, 0, -.04]}><mesh position={[0, 0, -.3]}><cylinderGeometry args={[.43, .43, .05, 48]} /><meshStandardMaterial color="#10141a" metalness={.6} roughness={.12} /></mesh><mesh position={[0, 0, -.34]}><cylinderGeometry args={[.24, .24, .055, 48]} /><meshPhysicalMaterial color="#143a4c" metalness={.9} roughness={0} /></mesh></group>
      <group ref={battery} position={[0, -.08, .02]}><RoundedBox args={[1.65, 2.25, .19]} radius={.12} smoothness={4}><meshStandardMaterial color="#17191e" metalness={.65} roughness={.4} /></RoundedBox></group>
      <group ref={screen} position={[0, 0, .3]}><RoundedBox args={[2.12, 3.02, .12]} radius={.2} smoothness={5}><MeshTransmissionMaterial transmission={.25} thickness={.3} roughness={.04} color="#071014" /></RoundedBox><mesh position={[0, .18, .072]}><planeGeometry args={[1.7, 2.32]} /><meshStandardMaterial emissive="#4477ff" emissiveIntensity={1.8} color="#10214d" metalness={.1} roughness={.22} /></mesh><mesh position={[0, 1.32, .08]}><capsuleGeometry args={[.09, .35, 8, 20]} /><meshBasicMaterial color="#080a0e" /></mesh></group>
      <mesh position={[1.25, .45, 0]} rotation={[0, Math.PI / 2, 0]} material={metal}><cylinderGeometry args={[.14, .14, .12, 32]} /></mesh>
      {showHotspots && <>
        <Hotspot id="display" title="AMOLED Display" description="Ultra bright · 2000 nits" position={[.48, .75, .46]} />
        <Hotspot id="crown" title="Tactile crown" description="Machined aerospace alloy" position={[1.3, .43, .05]} />
        <Hotspot id="sensor" title="Bio-sensing array" description="Continuous health insights" position={[.3, -.32, -.35]} />
      </>}
    </group>
  </Float>
}
