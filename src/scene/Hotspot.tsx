import { Html } from '@react-three/drei'
import type { Vector3Tuple } from 'three'
import { useShowcaseStore, type HotspotId } from '../store/useShowcaseStore'

type Props = { id: Exclude<HotspotId, null>; title: string; description: string; position: Vector3Tuple }
export function Hotspot({ id, title, description, position }: Props) {
  const selected = useShowcaseStore((s) => s.selectedHotspot)
  const select = useShowcaseStore((s) => s.selectHotspot)
  return <Html position={position} center distanceFactor={9} style={{ pointerEvents: 'auto' }}>
    <button className={`hotspot ${selected === id ? 'is-active' : ''}`} onClick={() => select(selected === id ? null : id)} aria-label={title}>
      <span className="hotspot-dot"><i /></span>
      <span className="hotspot-card"><b>{title}</b><small>{description}</small></span>
    </button>
  </Html>
}
