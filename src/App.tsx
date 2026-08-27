import { useEffect, useState } from 'react'
import { createScrollTimeline } from './animations/ScrollTimeline'
import { useLenis } from './hooks/useLenis'
import { Scene } from './scene/Scene'
import { useShowcaseStore, type HotspotId } from './store/useShowcaseStore'
import { LoadingScreen } from './components/LoadingScreen'

const features = [
  ['01', 'Pure titanium.', 'Aerospace-grade titanium, hand-finished to hold light like liquid metal.'],
  ['02', 'Precision, felt.', 'A sculpted silhouette engineered around the smallest gestures.'],
  ['03', 'Power that moves.', 'A new neural processor makes every response feel instantaneous.'],
  ['04', 'More day. Less charging.', 'Up to 48 hours of intentional, uninterrupted life.'],
]
const componentInfo: Record<Exclude<HotspotId, null>, { label: string; name: string; copy: string; detail: string }> = {
  display: { label: 'Screen', name: 'AMOLED Display', copy: 'A 1.9-inch edge-to-edge AMOLED panel calibrated for absolute clarity.', detail: '2000 nits peak brightness · Sapphire crystal' },
  crown: { label: 'Crown', name: 'Tactile Crown', copy: 'A precisely machined control with haptic feedback at every increment.', detail: 'Grade 5 titanium · Sealed rotary encoder' },
  sensor: { label: 'Sensors', name: 'Bio-sensing Array', copy: 'A multi-wavelength optical engine that makes health signals feel effortless.', detail: 'Heart rate · SpO₂ · Skin temperature' },
}
function App() {
  useLenis(); const [ready, setReady] = useState(false); const [componentsOpen, setComponentsOpen] = useState(false); const progress = useShowcaseStore(s => s.scrollProgress); const selected = useShowcaseStore(s => s.selectedHotspot); const selectHotspot = useShowcaseStore(s => s.selectHotspot)
  useEffect(() => { const kill = createScrollTimeline(); const timer = window.setTimeout(() => setReady(true), 850); return () => { kill(); clearTimeout(timer) } }, [])
  return <main>
    {!ready && <LoadingScreen />}
    <header><a className="brand" href="#top">AURELIA<sup>®</sup></a><span className="header-copy">SERIES 01</span><a className="header-link" href="#specs">Overview</a></header>
    <div className="scene-shell"><Scene showHotspots={componentsOpen} /><div className="grain" /></div>
    <aside className={`component-explorer ${componentsOpen ? 'is-open' : ''}`}>
      <button className="component-toggle" onClick={() => { setComponentsOpen((open) => !open); if (componentsOpen) selectHotspot(null) }} aria-expanded={componentsOpen}>
        <span className="component-icon">+</span>{componentsOpen ? 'Hide components' : 'Explore components'}
      </button>
      {componentsOpen && <div className="component-menu">
        <p>SELECT A COMPONENT</p>
        <div className="component-tabs">{(Object.keys(componentInfo) as Exclude<HotspotId, null>[]).map((id) => <button key={id} className={selected === id ? 'active' : ''} onClick={() => selectHotspot(id)}>{componentInfo[id].label}</button>)}</div>
        {selected ? <div className="component-detail"><span>0{(['display', 'crown', 'sensor'] as const).indexOf(selected) + 1}</span><h3>{componentInfo[selected].name}</h3><p>{componentInfo[selected].copy}</p><small>{componentInfo[selected].detail}</small></div> : <div className="component-detail empty"><p>Tap a marker on the product, or choose a component above.</p></div>}
      </div>}
    </aside>
    <div className="progress"><i style={{ transform: `scaleX(${progress})` }} /></div>
    <div id="story">
      <section id="top" className="hero panel"><div className="hero-copy"><p className="eyebrow">INTRODUCING</p><h1>Time, <em>reimagined.</em></h1><p className="lede">The precision instrument for a life in motion.</p><a className="cta" href="#materials">Meet Aurelia <span>↓</span></a></div><p className="scroll-hint">SCROLL TO EXPLORE <i /></p></section>
      {features.map(([number, title, description], i) => <section className={`feature panel feature-${i + 1}`} key={number}><div className="feature-copy"><p className="eyebrow">{number} / 04</p><h2>{title}</h2><p>{description}</p></div></section>)}
      <section id="materials" className="material panel"><div className="material-copy"><p className="eyebrow">MATERIAL STUDY</p><h2>Made to be<br /><em>held close.</em></h2><p>Brushed titanium. Sapphire crystal. A reflection you can feel.</p><div className="chips"><span>GRADE 5 TI</span><span>SAPPHIRE</span><span>CERAMIC</span></div></div></section>
      <section className="exploded panel"><div className="explode-copy"><p className="eyebrow">ENGINEERED WITH INTENT</p><h2>Nothing<br />unconsidered.</h2><p>Every layer is an argument for better.</p></div><aside><span>01 / DISPLAY</span><span>02 / POWER CELL</span><span>03 / SENSOR ARRAY</span></aside></section>
      <section id="specs" className="specs panel"><div className="spec-copy"><p className="eyebrow">TECHNICAL ESSENTIALS</p><h2>Less noise.<br /><em>More signal.</em></h2><div className="spec-grid">{[['Display', '1.9″ AMOLED'], ['Weight', '32 grams'], ['Battery', '48 hours'], ['Processor', 'A1 Neural'], ['Water resistance', '50 metres']].map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div></div></section>
      <footer><span>AURELIA / SERIES 01</span><span>DESIGNED FOR THE PRESENT</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  </main>
}
export default App
