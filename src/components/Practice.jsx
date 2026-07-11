import { useState } from 'react'

const MODES = {
  explore: {
    id: 'explore',
    label: 'Explore mode',
    type: 'concept',
    timer: 'Untimed',
    purpose: 'Optimize for explanation, transfer, and correct conditions.',
    coach: 'You found the useful strategy. What exactly must repeat — the last value alone, or the complete multiplication state? Explain why the fifth last digit confirms the cycle.',
  },
  compress: {
    id: 'compress',
    label: 'Compress mode',
    type: 'speed',
    timer: 'Target: 2 min',
    purpose: 'Turn a fully understood solution into a short reusable decision procedure.',
    coach: 'Compress your method into three actions: recognize the trigger, execute the cycle, verify the residue. Which details can be removed without losing correctness?',
  },
  contest: {
    id: 'contest',
    label: 'Contest mode',
    type: 'speed',
    timer: '01:42 remaining',
    purpose: 'Optimize recognition, commitment, accurate execution, and timed verification.',
    coach: 'You have enough information to commit. State the cycle length, reduce 2026, and calculate. Do not explore an alternate method unless this path fails.',
  },
  reflect: {
    id: 'reflect',
    label: 'Reflection mode',
    type: 'concept',
    timer: 'Timer stopped',
    purpose: 'Compare what was mathematically strongest with what was fastest.',
    coach: 'Why was the cycle method both faster and clearer here? Give one different problem where Euler reduction might become the better choice.',
  },
}

const FEEDBACK = `Concept update: You correctly identified that the state must return to its starting residue.\n\nSpeed update: Save the trigger — "large exponent + small modulus → test a short residue cycle." Now reduce 2026 modulo 4.`

export default function Practice() {
  const [modeKey, setModeKey] = useState('explore')
  const [thinking, setThinking] = useState(
    'I should list 7, 9, 3, 1 and check that multiplying by 7 gives 7 again, so the state restarts.'
  )
  const [submitted, setSubmitted] = useState(false)

  const m = MODES[modeKey]

  function switchMode(key) {
    setModeKey(key)
    setSubmitted(false)
  }

  return (
    <div>
      {/* Mode bar */}
      <div className="modebar">
        {Object.values(MODES).map(({ id, label }) => (
          <button
            key={id}
            className={`modebar-btn ${modeKey === id ? 'active' : ''}`}
            onClick={() => switchMode(id)}
          >
            {label.replace(' mode', '')}
          </button>
        ))}
      </div>

      <div className="workspace">
        {/* ── Problem card (sticky) ── */}
        <div className="card sticky-col">
          <span className="tag">AMC 10 · Number theory</span>
          <h3 style={{ marginTop: 12 }}>Power remainder</h3>
          <p>
            Find the remainder when{' '}
            <strong>7<sup>2026</sup> + 3<sup>2026</sup></strong> is divided by 10.
          </p>
          <div className="math-display">7²⁰²⁶ + 3²⁰²⁶ (mod 10)</div>

          <div className="label" style={{ marginTop: 12 }}>Session objectives</div>
          <p><span className="tag concept">Explain full-cycle verification</span></p>
          <p><span className="tag speed">Recognize cycle method in 40 sec</span></p>
          <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '12px 0' }} />
          <div className="metric" style={{ fontSize: 22 }}>{m.timer}</div>
          <div className="muted" style={{ fontSize: 12 }}>{m.purpose}</div>
        </div>

        {/* ── Reasoning workspace ── */}
        <div>
          <div className="card">
            <div className="row between">
              <h3>Your reasoning</h3>
              <span className="pill">Autosaved</span>
            </div>
            <div className="timeline">
              <div className="step concept">
                <strong>Concept evidence</strong>
                <div>You proposed looking for a repeating last-digit pattern.</div>
                <span className="tag good">Correct structural choice</span>
              </div>
              <div className="step speed">
                <strong>Speed evidence</strong>
                <div>Strategy selected after 74 seconds.</div>
                <span className="tag warn">Target: 40 seconds</span>
              </div>
              <div className="step">
                <strong>Current step</strong>
                <div>Explain what proves that the cycle is complete.</div>
              </div>
            </div>
            <textarea
              value={thinking}
              onChange={e => setThinking(e.target.value)}
            />
            <div className="row between" style={{ marginTop: 10 }}>
              <span className="muted">Voice · scan · pencil also available</span>
              <button className="btn" onClick={() => setSubmitted(true)}>
                Submit thinking
              </button>
            </div>
          </div>

          {submitted && (
            <div className="feedback-card">
              {FEEDBACK.split('\n\n').map((para, i) => (
                <p key={i} style={{ margin: i > 0 ? '8px 0 0' : 0 }}>
                  <strong>{para.split(':')[0]}:</strong>
                  {para.substring(para.indexOf(':') + 1)}
                </p>
              ))}
            </div>
          )}

          <div className="card" style={{ marginTop: 14 }}>
            <div className="row between">
              <h3>Two-way coach decision</h3>
              <div>
                <span className="tag concept">Concept</span>{' '}
                <span className="tag speed">Speed</span>
              </div>
            </div>
            <table>
              <thead>
                <tr><th>Evidence</th><th>Current conclusion</th><th>Next intervention</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Concept</td>
                  <td>Understands periodicity but must justify closure</td>
                  <td>Ask for proof of restart</td>
                </tr>
                <tr>
                  <td>Speed</td>
                  <td>Correct path chosen too slowly</td>
                  <td>Create a trigger phrase after solving</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Coach panel (sticky) ── */}
        <div className="coachcol">
          <div className="card sticky-col">
            <div className="row between">
              <h3>Thinking Coach</h3>
              <span className={`tag ${m.type}`}>{m.label}</span>
            </div>
            <div className="coach-card">{m.coach}</div>
            <div className="decision-grid">
              <button className="decision-btn">
                <b>Go deeper</b>
                <span className="muted">Why does this work?</span>
              </button>
              <button className="decision-btn">
                <b>Make it faster</b>
                <span className="muted">Build a recognition trigger</span>
              </button>
              <button className="decision-btn">
                <b>Try another path</b>
                <span className="muted">Compare Euler reduction</span>
              </button>
              <button className="decision-btn">
                <b>Contest test</b>
                <span className="muted">Restart with a timer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
