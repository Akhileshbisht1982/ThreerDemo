import { Float, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef,useState ,useMemo} from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'
import { useShowcaseStore } from '../store/useShowcaseStore'
import { Hotspot } from './Hotspot'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_5: THREE.Mesh
    Object_6: THREE.Mesh
    Object_7: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_11: THREE.Mesh
    Object_12: THREE.Mesh
    Object_13: THREE.Mesh
    Object_14: THREE.Mesh
    Object_15: THREE.Mesh
    Object_17: THREE.Mesh
    Object_18: THREE.Mesh
    Object_19: THREE.Mesh
    Object_20: THREE.Mesh
    Object_21: THREE.Mesh
    Object_22: THREE.Mesh
    Object_23: THREE.Mesh
    Object_24: THREE.Mesh
    Object_25: THREE.Mesh
    Object_26: THREE.Mesh
    Object_27: THREE.Mesh
    Object_28: THREE.Mesh
  }
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
    Back: THREE.MeshStandardMaterial
    GOLD: THREE.MeshStandardMaterial
    BARRES: THREE.MeshStandardMaterial
    Labber: THREE.MeshStandardMaterial
    GLASS: THREE.MeshStandardMaterial
    Lenscover: THREE.MeshStandardMaterial
    material: THREE.MeshStandardMaterial
    Display: THREE.MeshStandardMaterial
    ['Lens.2']: THREE.MeshStandardMaterial
    material_11: THREE.MeshStandardMaterial
  }
}

type ProductProps = { showHotspots?: boolean }

export default function Iphone({ showHotspots = false }: ProductProps) {
  const root = useRef<THREE.Group>(null)
  const progress = useShowcaseStore((s) => s.scrollProgress)
  const INITIAL_ROTATION_Y = Math.PI * 0.5
  const INITIAL_ROTATION_X = 0
  const [displayMode, setDisplayMode] = useState<'normal' | 'red' | 'blue'>(
  'normal'
)

 
  const { nodes, materials } = useGLTF('/free_iphone_13_pro_2021.glb') as GLTFResult
console.log(nodes)

const displayMaterials = useMemo(() => ({
  normal: materials.Display,

  red: new THREE.MeshStandardMaterial({
    color: '#ff3333',
    emissive: '#330000',
    emissiveIntensity: 1,
    metalness: 0.1,
    roughness: 0.25,
  }),

  blue: new THREE.MeshStandardMaterial({
    color: '#3366ff',
    emissive: '#001133',
    emissiveIntensity: 1,
    metalness: 0.1,
    roughness: 0.25,
  }),
}), [materials.Display])


// nodes.Iphone001_1.traverse((child) => {
//   console.log(
//     'CHILD:',
//     child.name,
//     child.type
//   )
// })

useFrame((state, delta) => {
  if (!root.current) return

  const targetY =
  INITIAL_ROTATION_Y +
    progress * Math.PI * 3.25 +
    Math.sin(state.clock.elapsedTime * 0.35) * 0.06

  const targetX =
  INITIAL_ROTATION_X+
    Math.sin(progress * Math.PI * 2) * 0.16

  root.current.rotation.y = THREE.MathUtils.lerp(
    root.current.rotation.y,
    targetY,
    delta * 6
  )

  root.current.rotation.x = THREE.MathUtils.lerp(
    root.current.rotation.x,
    targetX,
    delta * 6
  )
})

  return (
    <Float speed={1.25} rotationIntensity={0.08} floatIntensity={0.2}>
      <group ref={root} scale={1.22}>
        {/* iPhone model from Product_2 */}
        <group rotation={[-Math.PI / 2, 0, 0]} scale={0.545}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group position={[-0.104, 1.448, -0.258]} scale={0.043} >
              <mesh geometry={nodes.Object_4.geometry} material={materials['Material.001']}  />
              <mesh geometry={nodes.Object_5.geometry} material={materials.Black} />
              <mesh geometry={nodes.Object_6.geometry} material={materials.Back} />
              <mesh geometry={nodes.Object_7.geometry} material={materials.GOLD} />
              <mesh geometry={nodes.Object_8.geometry} material={materials.BARRES} />
              <mesh geometry={nodes.Object_9.geometry} material={materials.Labber} />
              <mesh geometry={nodes.Object_10.geometry} material={materials.GLASS} />
              <mesh geometry={nodes.Object_11.geometry} material={materials.Lenscover} />
              <mesh geometry={nodes.Object_12.geometry} material={materials.material}/>
              {/* <mesh geometry={nodes.Object_13.geometry} material={materials.Display}    /> */}
              <mesh geometry={nodes.Object_13.geometry} material={materials.Display}    />
              
              <mesh geometry={nodes.Object_14.geometry} material={materials['Lens.2']}  />
              <mesh geometry={nodes.Object_15.geometry} material={materials.material_11} />
            </group>
            <group position={[-0.136, 1.448, 1.545]} rotation={[-Math.PI, 0, -Math.PI]} scale={0.043}>
              <mesh geometry={nodes.Object_17.geometry} material={materials['Material.001']} visible={false} />
              <mesh geometry={nodes.Object_18.geometry} material={materials.Black}visible={false}  />
              <mesh geometry={nodes.Object_19.geometry} material={materials.Back} visible={false} />
              <mesh geometry={nodes.Object_20.geometry} material={materials.GOLD} visible={false} />
              <mesh geometry={nodes.Object_21.geometry} material={materials.BARRES}visible={false}  />
              <mesh geometry={nodes.Object_22.geometry} material={materials.Labber} visible={false} />
              <mesh geometry={nodes.Object_23.geometry} material={materials.GLASS}visible={false}  />
              <mesh geometry={nodes.Object_24.geometry} material={materials.Lenscover}visible={false}  />
              <mesh geometry={nodes.Object_25.geometry} material={materials.material} visible={false} />
              <mesh geometry={nodes.Object_26.geometry} material={materials.Display}visible={false}  />
              <mesh geometry={nodes.Object_27.geometry} material={materials['Lens.2']}visible={false}  />
              <mesh geometry={nodes.Object_28.geometry} material={materials.material_11} visible={false} />
            </group>
          </group>
        </group>

        {showHotspots && (
          <>
            <Hotspot
              id="display"
              title="AMOLED Display"
              description="Ultra bright · 2000 nits"
              position={[0.48, 0.75, 0.46]}
            />
            <Hotspot
              id="crown"
              title="Tactile crown"
              description="Machined aerospace alloy"
              position={[1.3, 0.43, 0.05]}
            />
            <Hotspot
              id="sensor"
              title="Bio-sensing array"
              description="Continuous health insights"
              position={[0.3, -0.32, -0.35]}
            />
          </>
        )}
      </group>
    </Float>
  )
}

useGLTF.preload('/free_iphone_13_pro_2021.glb')

