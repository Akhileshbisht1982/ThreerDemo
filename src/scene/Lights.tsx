import { ContactShadows, Environment, Lightformer } from '@react-three/drei'
export function Lights() {
  return <>
    <Environment resolution={256}><Lightformer intensity={3} position={[3, 4, 3]} scale={[5, 5, 1]} /><Lightformer intensity={2} position={[-4, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[4, 2, 1]} /></Environment>
    <ambientLight intensity={.25} /><spotLight position={[3, 5, 4]} intensity={80} angle={.45} penumbra={1} castShadow />
    <pointLight position={[-4, 1, -3]} intensity={18} color="#aab7ff" />
    <ContactShadows position={[0, -2, 0]} opacity={.45} scale={8} blur={2.8} far={4} />
  </>
}
