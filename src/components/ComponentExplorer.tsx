import { useShowcaseStore, type HotspotId } from '../store/useShowcaseStore'

const components: Record<Exclude<HotspotId, null>, { name: string; label: string; copy: string; detail: string }> = {
  display: { name: 'AMOLED Display', label: 'Screen', copy: 'A 1.9-inch edge-to-edge AMOLED panel calibrated for absolute clarity.', detail: '2000 nits peak brightness · Sapphire crystal' },
  crown: { name: 'Tactile Crown', label: 'Crown', copy: 'A precisely machined control with haptic feedback at every increment.', detail: 'Grade 5 titanium · Sealed rotary encoder' },
  sensor: { name: 'Bio-sensing Array', label: 'Sensors', copy: 'A multi-wavelength optical engine that makes health signals feel effortless.', detail: 'Heart rate · SpO₂ · Skin temperature' },
}

type Props = { open: boolean; onToggle: () => void }
export function ComponentExplorer({ open, onToggle }: Props) {
  const selected = useShowcaseStore((state) => state.selectedHotspot)
  const select = useShowcaseStore((state) => state.selectHotspot)
  const active = selected ? components[selected] : null
  return <aside className={`component-explorer ${open ? 'is-open' : ''}`}>
    <button className="component-toggle" onClick={onToggle} aria-expanded={open}>
      <span className="component-icon">+</span>{open ? 'Hide components' : 'Explore components'}
    </button>
    {open && <div className="component-menu">
      <p>SELECT A COMPONENT</p>
      <div className="component-tabs">{(Object.keys(components) as Exclude<HotspotId, null>[]).map((id) => <button key={id} className={selected === id ? 'active' : ''} onClick={() => select(id)}>{components[id].label}</button>)}</div>
      {active ? <div className="component-detail"><span>0{(['display', 'crown', 'sensor'] as string[]).indexOf(selected!) + 1}</span><h3>{active.name}</h3><p>{active.copy}</p><small>{active.detail}</small></div> : <div className="component-detail empty"><p>Tap a marker on the product, or choose a component above.</p></div>}
    </div>}
  </aside>
}
