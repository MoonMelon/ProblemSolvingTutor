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

export default function Plan() {
  return (
    <div className="card">
      <h2 style={{ marginBottom: 16 }}>Weekly plan</h2>
      <div className="list">
        {PLAN_ITEMS.map(p => (
          <div key={p.day} className="item">
            <strong>{p.day}</strong>
            <div className="muted" style={{ marginTop: 4 }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}