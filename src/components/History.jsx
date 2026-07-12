const HISTORY = [
  {
    date: 'Jul 10',
    problem: 'Power remainder',
    notes: 'Justified complete cycle after one prompt, 74 sec to identify strategy',
    next: '3 recognition sprints',
    cTag: 'concept',
    sTag: 'warn',
  },
  {
    date: 'Jul 8',
    problem: 'Chessboard invariant',
    notes: 'Started casework; invariant not understood, Committed quickly to wrong path',
    next: 'Concept repair, no timing',
    cTag: 'warn',
    sTag: 'warn',
  },
  {
    date: 'Jul 6',
    problem: 'Similar triangles',
    notes: 'Independent correspondence proof, 42 sec recognition, 5:20 total',
    next: 'Mixed timed transfer',
    cTag: 'good',
    sTag: 'good',
  },
]

export default function History() {
  return (
    <div>
      <div className="card">
        <h2 style={{ margin: '0 0 16px' }}>Learning history</h2>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Problem / concept</th>
                <th>Notes</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {HISTORY.map((r, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{r.date}</td>
                  <td><strong>{r.problem}</strong></td>
                  <td>{r.notes}</td>
                  <td><span className="tag">{r.next}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  )
}
