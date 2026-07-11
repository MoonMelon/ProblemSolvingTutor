const CONCEPT_ROWS = [
  { d: 'Concept recognition',   s: 76, e: 'Finds relevant ideas when untimed' },
  { d: 'Why / justification',   s: 68, e: 'Sometimes omits required conditions' },
  { d: 'Transfer',              s: 59, e: 'Needs unfamiliar-form practice' },
  { d: 'Alternative comparison', s: 73, e: 'Can discuss tradeoffs after solving' },
  { d: 'Retention',             s: 81, e: 'Stable over 30 days' },
]

const SPEED_ROWS = [
  { d: 'Problem triage',               s: 66, e: 'Selects solvable problems reasonably' },
  { d: 'Strategy-recognition latency', s: 52, e: 'Median 74 sec; target 40 sec' },
  { d: 'Execution fluency',            s: 69, e: 'Few pauses after committing' },
  { d: 'Abandon / switch decision',    s: 48, e: 'Stays with weak paths too long' },
  { d: 'Timed verification',           s: 71, e: 'Checks answer when time permits' },
]

const MATRIX = [
  { c: 'Residue cycles',      dm: 78, rs: 51, es: 74, w: 'Recognition sprints' },
  { c: 'Parity / invariants', dm: 46, rs: 43, es: 58, w: 'Concept repair before timing' },
  { c: 'Similar triangles',   dm: 75, rs: 70, es: 68, w: 'Mixed timed transfer' },
  { c: 'Strategic casework',  dm: 61, rs: 56, es: 49, w: 'Case-design compression' },
]

function ScoreBar({ value, type = 'concept' }) {
  return (
    <div className={`progress ${type}`} style={{ marginTop: 0, minWidth: 64 }}>
      <span style={{ width: `${value}%` }} />
    </div>
  )
}

function TrackerTable({ rows, type }) {
  return (
    <table>
      <thead>
        <tr><th>Dimension</th><th>Score</th><th style={{ minWidth: 72 }}>Progress</th><th>Evidence</th></tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r.d}>
            <td>{r.d}</td>
            <td><strong>{r.s}</strong></td>
            <td><ScoreBar value={r.s} type={type} /></td>
            <td className="muted">{r.e}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Trackers() {
  return (
    <div>
      <div className="grid g2">
        <div className="card">
          <div className="row between" style={{ marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Concept tracker</h2>
            <span className="tag concept">Understanding</span>
          </div>
          <TrackerTable rows={CONCEPT_ROWS} type="concept" />
        </div>

        <div className="card">
          <div className="row between" style={{ marginBottom: 12 }}>
            <h2 style={{ margin: 0 }}>Speed tracker</h2>
            <span className="tag speed">Execution</span>
          </div>
          <TrackerTable rows={SPEED_ROWS} type="speed" />
        </div>
      </div>

      {/* ── Cross-track diagnostic matrix ── */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Cross-track diagnostic matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Concept area</th>
                <th>Deep mastery</th>
                <th>Recognition speed</th>
                <th>Execution speed</th>
                <th>Recommended workout</th>
              </tr>
            </thead>
            <tbody>
              {MATRIX.map(r => (
                <tr key={r.c}>
                  <td><strong>{r.c}</strong></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{r.dm}</span>
                      <ScoreBar value={r.dm} type="concept" />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{r.rs}</span>
                      <ScoreBar value={r.rs} type="speed" />
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>{r.es}</span>
                      <ScoreBar value={r.es} type="good" />
                    </div>
                  </td>
                  <td><span className="tag">{r.w}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
