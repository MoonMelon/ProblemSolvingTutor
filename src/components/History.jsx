const HISTORY = [
  {
    date: 'Jul 10',
    problem: 'Power remainder',
    concept: 'Justified complete cycle after one prompt',
    speed: '74 sec to identify strategy',
    next: '3 recognition sprints',
    cTag: 'concept',
    sTag: 'warn',
  },
  {
    date: 'Jul 8',
    problem: 'Chessboard invariant',
    concept: 'Started casework; invariant not understood',
    speed: 'Committed quickly to wrong path',
    next: 'Concept repair, no timing',
    cTag: 'warn',
    sTag: 'warn',
  },
  {
    date: 'Jul 6',
    problem: 'Similar triangles',
    concept: 'Independent correspondence proof',
    speed: '42 sec recognition, 5:20 total',
    next: 'Mixed timed transfer',
    cTag: 'good',
    sTag: 'good',
  },
]

export default function History() {
  return (
    <div>
      <div className="card">
        <div className="row between" style={{ marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>Paired learning history</h2>
          <button className="btn secondary">Export report</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Problem / concept</th>
                <th>Concept evidence</th>
                <th>Speed evidence</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((r, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{r.date}</td>
                  <td><strong>{r.problem}</strong></td>
                  <td>
                    <span className={`tag ${r.cTag}`} style={{ marginRight: 6 }} />
                    {r.concept}
                  </td>
                  <td>
                    <span className={`tag ${r.sTag}`} style={{ marginRight: 6 }} />
                    {r.speed}
                  </td>
                  <td><span className="tag">{r.next}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Concept trend</h3>
          <div className="note">
            Explanations are becoming more precise, but transfer to unfamiliar representations is still inconsistent.
          </div>
          <div style={{ marginTop: 14 }}>
            <div className="label">Concept score over time</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 8, height: 50 }}>
              {[58, 63, 67, 70, 72].map((v, i) => (
                <div key={i} title={`Session ${i + 1}: ${v}`} style={{
                  flex: 1, height: `${(v / 80) * 100}%`, background: 'var(--concept-bg)',
                  border: '1px solid var(--concept-border)', borderRadius: 4,
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  paddingBottom: 2, fontSize: 10, color: 'var(--concept)', fontWeight: 700,
                }}>{v}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Speed trend</h3>
          <div className="note">
            Execution after strategy selection is improving. Most remaining time loss occurs before commitment or during path switching.
          </div>
          <div style={{ marginTop: 14 }}>
            <div className="label">Speed score over time</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', marginTop: 8, height: 50 }}>
              {[44, 50, 54, 58, 61].map((v, i) => (
                <div key={i} title={`Session ${i + 1}: ${v}`} style={{
                  flex: 1, height: `${(v / 70) * 100}%`, background: 'var(--speed-bg)',
                  border: '1px solid var(--speed-border)', borderRadius: 4,
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  paddingBottom: 2, fontSize: 10, color: 'var(--speed)', fontWeight: 700,
                }}>{v}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
