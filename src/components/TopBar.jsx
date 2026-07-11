export default function TopBar({ title, onMenuToggle, onBotToggle, botOpen }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={onMenuToggle} aria-label="Open menu">
          ☰
        </button>
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">
        <span className="pill">🔥 Streak 5</span>
        <span className="pill">AMC 10</span>
        <button
          className={`btn sm ${botOpen ? 'secondary' : ''}`}
          onClick={onBotToggle}
        >
          🤖 Coach
        </button>
      </div>
    </header>
  )
}
