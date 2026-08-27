import { AdaptiveDpr, OrbitControls, PerspectiveCamera, Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig } from './CameraRig'
import { Lights } from './Lights'
import Iphone from './Product2'

type SceneProps = { showHotspots?: boolean }

export function Scene({ showHotspots = false }: SceneProps) {
  return <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, powerPreference: 'high-performance' }}>
    <Suspense fallback={null}><PerspectiveCamera makeDefault position={[0, .3, 7]} fov={36} /><color attach="background" args={['#050507']} />
      <Lights /><Iphone showHotspots={showHotspots} /><CameraRig /><AdaptiveDpr pixelated /><Preload all />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Suspense>
  </Canvas>
}
