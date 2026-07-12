const CONCEPT_ROWS = [
  { d: 'Concept recognition',   s: 77},
  { d: 'Why / justification',   s: 68},
  { d: 'Transfer',              s: 59},
  { d: 'Alternative comparison', s: 73},
  { d: 'Retention',             s: 81},
]

const SPEED_ROWS = [
  { d: 'Problem triage',               s: 66},
  { d: 'Strategy-recognition latency', s: 52},
  { d: 'Execution fluency',            s: 69},
  { d: 'Abandon / switch decision',    s: 48},
  { d: 'Timed verification',           s: 71},
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
        <tr><th>Dimension</th><th>Score</th><th style={{ minWidth: 72 }}>Progress</th></tr>
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
    </div>
  )
}

      