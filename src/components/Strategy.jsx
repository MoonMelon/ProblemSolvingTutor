import { useState } from 'react'

const STRATEGIES = [
  {
    id: 'last-digit',
    name: 'Last-digit cycles',
    recommended: true,
    concept: 80,
    contest: 92,
    readiness: 76,
    desc: 'Direct, visible structure, and fast for modulus 10. Best balanced choice.',
  },
  {
    id: 'euler',
    name: 'Euler-style reduction',
    concept: 74,
    contest: 65,
    readiness: 58,
    desc: 'More general, but requires theorem conditions and is unnecessary here.',
  },
  {
    id: 'squaring',
    name: 'Repeated squaring',
    concept: 69,
    contest: 48,
    readiness: 82,
    desc: 'General computational method; higher arithmetic load for this problem.',
  },
]

const FOCUS_OPTIONS = ['Balanced']

function BarRow({ label, value }) {
  return (
    <div className="barrow">
      <span>{label}</span>
      <div className="microbar">
        <span style={{ width: `${value}%` }} />
      </div>
      <b>{value}</b>
    </div>
  )
}

export default function Strategy() {
  const [focus, setFocus] = useState('Balanced')

  return (
    <div>
      <div className="row between" style={{ marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0 }}>Strategy comparison</h2>
          <p className="muted">Compare conceptual value and contest utility separately.</p>
        </div>
        <div className="selector">
          {FOCUS_OPTIONS.map(f => (
            <button
              key={f}
              className={`selector-btn ${focus === f ? 'active' : ''}`}
              onClick={() => setFocus(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid g3">
        {STRATEGIES.map(s => (
          <div key={s.id} className={`strategy ${s.recommended ? 'recommended' : ''}`}>
            {s.recommended && (
              <span className="tag good">Recommended now</span>
            )}
            <h3 style={{ marginTop: s.recommended ? 10 : 0 }}>{s.name}</h3>
            <div className="bars">
              <BarRow label="Concept value"    value={s.concept} />
              <BarRow label="Contest speed"    value={s.contest} />
              <BarRow label="Student readiness" value={s.readiness} />
            </div>
            <p className="muted" style={{ marginTop: 10, marginBottom: 0 }}>{s.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
