const PLAN_ITEMS = [
  {
    day: 'Monday · Build',
    desc: '2 untimed problems; explain triggers, conditions, and alternatives',
    concept: 70, speed: 30,
  },
  {
    day: 'Tuesday · Compress',
    desc: "Redo Monday's structures with shorter written plans",
    concept: 40, speed: 60,
  },
  {
    day: 'Thursday · Recognition sprint',
    desc: '10 problem openings; choose strategy without solving fully',
    concept: 20, speed: 80,
  },
  {
    day: 'Saturday · Mixed contest set',
    desc: 'Timed set plus post-set concept reconstruction',
    concept: 50, speed: 50,
  },
]

const POLICY_ROWS = [
  { cond: 'Low concept, low speed',   action: 'Teach concept first; do not reward guessing quickly' },
  { cond: 'High concept, low speed',  action: 'Recognition drills, compression, timed repetition' },
  { cond: 'Low concept, high speed',  action: 'Slow down; require justification and transfer' },
  { cond: 'High concept, high speed', action: 'Harder problems, alternate paths, contest simulation' },
]

export default function Plan() {
  return (
    <div>
      <div className="grid g2">
        {/* ── Weekly plan ── */}
        <div className="card">
          <h2>Adaptive weekly plan</h2>
          <div className="list">
            {PLAN_ITEMS.map(p => (
              <div key={p.day} className="item">
                <strong>{p.day}</strong>
                <div className="muted" style={{ margin: '4px 0 8px' }}>{p.desc}</div>
                <div className="row" style={{ marginBottom: 6 }}>
                  <span className="tag concept">Concept {p.concept}%</span>
                  <span className="tag speed">Speed {p.speed}%</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  <div>
                    <div className="label" style={{ marginBottom: 3 }}>Concept</div>
                    <div className="progress concept">
                      <span style={{ width: `${p.concept}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="label" style={{ marginBottom: 3 }}>Speed</div>
                    <div className="progress speed">
                      <span style={{ width: `${p.speed}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Planning policy ── */}
        <div className="card">
          <h2>Planning policy</h2>
          <table>
            <tbody>
              {POLICY_ROWS.map(r => (
                <tr key={r.cond}>
                  <td><strong>{r.cond}</strong></td>
                  <td className="muted">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="note" style={{ marginTop: 16 }}>
            The application never interprets speed alone as mastery and never interprets untimed explanation alone as contest readiness.
          </div>

          {/* Goal callout */}
          <div className="card" style={{ marginTop: 14, background: 'var(--concept-bg)', border: '1px solid var(--concept-border)' }}>
            <div className="label">Current goal</div>
            <div style={{ fontSize: 16, fontWeight: 700, margin: '4px 0 2px' }}>AMC 10 → AIME qualification</div>
            <div className="muted">November 2026 · 17 weeks remaining</div>
            <div className="progress concept" style={{ marginTop: 10 }}>
              <span style={{ width: '38%' }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 4 }}>38% of estimated preparation complete</div>
          </div>
        </div>
      </div>
    </div>
  )
}
