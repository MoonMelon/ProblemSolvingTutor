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
