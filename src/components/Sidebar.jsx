const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: '⌂' },
  { id: 'practice',  label: 'Practice',   icon: '✎' },
  { id: 'trackers',  label: 'Trackers',   icon: '◫' },
  { id: 'strategy',  label: 'Strategies', icon: '⇆' },
  { id: 'history',   label: 'History',    icon: '↶' },
  { id: 'plan',      label: 'Plan',       icon: '⇢' },
]

export default function Sidebar({ activePage, onNavigate, isOpen, onClose, onBotToggle, botOpen }) {
  return (
    <>
      {/* Overlay dimmer for mobile drawer */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-name">ProofPath</div>
          <span className="brand-sub">Deep understanding. Fast execution.</span>
        </div>

        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}

          <div className="nav-divider" />

          <button
            className={`sidebar-bot-btn ${botOpen ? 'active' : ''}`}
            onClick={onBotToggle}
          >
            <span className="nav-icon">🤖</span>
            <span className="btn-label">Thinking Coach</span>
          </button>
        </nav>

        <div className="sidebar-profile">
          <span className="profile-name">Maya S.</span>
          AMC 10 → AIME track<br />
          Goal: November 2026
        </div>
      </aside>
    </>
  )
}
