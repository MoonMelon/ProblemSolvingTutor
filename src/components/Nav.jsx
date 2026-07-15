import { BookOpenIcon } from './Icons.jsx'

export default function Nav({ screen, navigate }) {
  return (
    <nav className="nav">
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => navigate('home')}>
          <span className="nav__mark">P</span>
          <span className="nav__name">ProofPath</span>
        </button>

        <div className="nav__links">
          <button
            className={`nav__link ${screen === 'home' || screen === 'library' || screen === 'upload' || screen === 'attempt' || screen === 'workspace' || screen === 'completion' ? 'nav__link--active' : ''}`}
            onClick={() => navigate('home')}
          >
            Practice
          </button>
          <button
            className={`nav__link ${screen === 'history' ? 'nav__link--active' : ''}`}
            onClick={() => navigate('history')}
          >
            History
          </button>
        </div>
      </div>
    </nav>
  )
}
