export default function Dashboard({ onNavigate }) {
  return (
    <div>
      {/* Page header */}
      <div className="row between" style={{ marginBottom: 18 }}>
        <div>
          <h2 style={{ margin: 0 }}>Build deeply, then compress for speed</h2>
          <p className="muted" style={{ margin: '5px 0 0' }}>
            The two trackers are scored separately and combined only for planning.
          </p>
        </div>
        <button className="btn" onClick={() => onNavigate('practice')}>
          Continue session →
        </button>
      </div>

      {/* ── Dual-track summary ── */}
      <div className="dual-track">
        <div className="track concept">
          <div className="row between">
            <span className="tag concept">Concept track</span>
            <span className="delta good">+6 this month</span>
          </div>
          <div className="metric">72</div>
          <strong>Structural understanding</strong>
          <div className="progress concept">
            <span style={{ width: '72%' }} />
          </div>
          <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
            Can explain why a method works, recognize transfer, justify conditions, and compare alternatives.
          </p>
        </div>

        <div className="track speed">
          <div className="row between">
            <span className="tag speed">Speed track</span>
            <span className="delta good">+9 this month</span>
          </div>
          <div className="metric">61</div>
          <strong>Contest execution</strong>
          <div className="progress speed">
            <span style={{ width: '61%' }} />
          </div>
          <p className="muted" style={{ marginTop: 8, marginBottom: 0 }}>
            Can recognize a useful path quickly, execute accurately, abandon weak paths, and verify within time.
          </p>
        </div>
      </div>

      {/* ── Bottleneck + readiness cards ── */}
      <div className="grid g3" style={{ marginTop: 16 }}>
        <div className="card">
          <div className="label">Concept bottleneck</div>
          <div className="metric" style={{ fontSize: 20 }}>Invariant selection</div>
          <span className="tag concept">Needs transfer</span>
        </div>
        <div className="card">
          <div className="label">Speed bottleneck</div>
          <div className="metric" style={{ fontSize: 20 }}>Late commitment</div>
          <span className="tag speed">+2.4 min/problem</span>
        </div>
        <div className="card">
          <div className="label">Balanced readiness</div>
          <div className="metric">64</div>
          <p className="muted" style={{ margin: 0 }}>Useful only as a planning summary</p>
        </div>
      </div>

      {/* ── Today's workout + coach recommendation ── */}
      <div className="grid g2" style={{ marginTop: 16 }}>
        <div className="card">
          <h3>Today's paired workout</h3>
          <div className="list">
            <div className="item">
              <span className="tag concept">Deep pass</span>
              <strong> Explain why residue cycles work</strong>
              <div className="muted">Untimed · compare two methods · identify failure conditions</div>
            </div>
            <div className="item">
              <span className="tag speed">Compression pass</span>
              <strong> Solve 4 last-digit problems</strong>
              <div className="muted">8 minutes · recognition target under 40 seconds</div>
            </div>
            <div className="item">
              <span className="tag good">Bridge</span>
              <strong> State your contest trigger</strong>
              <div className="muted">"Large exponent + small modulus → test residue cycle."</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>Coach recommendation</h3>
          <div className="note">
            You understand modular cycles when prompted, but strategy recognition is slow.
            Do one deep explanation first, then repeat the same structural pattern under time pressure.
          </div>
          <table style={{ marginTop: 12 }}>
            <tbody>
              <tr><td>Deep-work share</td><td><strong>45%</strong></td></tr>
              <tr><td>Timed-work share</td><td><strong>40%</strong></td></tr>
              <tr><td>Reflection share</td><td><strong>15%</strong></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
