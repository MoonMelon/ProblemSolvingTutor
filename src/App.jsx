
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './components/Dashboard'
import Practice from './components/Practice'
import Trackers from './components/Trackers'
import Strategy from './components/Strategy'
import History from './components/History'
import Plan from './components/Plan'
import Bot from './components/Bot'
import './App.css'

const PAGES = {
  dashboard: { label: 'Dashboard',  Component: Dashboard },
  practice:  { label: 'Practice',   Component: Practice  },
  trackers:  { label: 'Trackers',   Component: Trackers  },
  strategy:  { label: 'Strategies', Component: Strategy  },
  history:   { label: 'History',    Component: History   },
  plan:      { label: 'Plan',       Component: Plan      },
}

const MOBILE_NAV = [
  { id: 'dashboard', label: 'Home',    icon: '⌂' },
  { id: 'practice',  label: 'Practice', icon: '✎' },
  { id: 'trackers',  label: 'Track',   icon: '◫' },
  { id: 'history',   label: 'History', icon: '↶' },
  { id: 'plan',      label: 'Plan',    icon: '⇢' },
]

export default function App() {
  const [activePage, setActivePage]   = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [botOpen, setBotOpen]         = useState(false)

  const { Component: ActivePage } = PAGES[activePage]

  function navigate(page) {
    setActivePage(page)
    setSidebarOpen(false)
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onBotToggle={() => setBotOpen(b => !b)}
        botOpen={botOpen}
      />

      <div className="main">
        <TopBar
          title={PAGES[activePage].label}
          onMenuToggle={() => setSidebarOpen(true)}
          onBotToggle={() => setBotOpen(b => !b)}
          botOpen={botOpen}
        />
        <div className="page-content">
          <ActivePage onNavigate={navigate} />
        </div>
      </div>

      {/* ── Bot: completely separate, floating module ── */}
      <Bot isOpen={botOpen} onClose={() => setBotOpen(false)} />

      {/* ── Mobile bottom navigation ── */}
      <nav className="mobile-bottom-nav">
        {MOBILE_NAV.map(item => (
          <button
            key={item.id}
            className={`mobile-nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => navigate(item.id)}
          >
            <span className="m-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <button
          className={`mobile-nav-item ${botOpen ? 'active' : ''}`}
          onClick={() => setBotOpen(b => !b)}
        >
          <span className="m-icon">🤖</span>
          <span>Coach</span>
        </button>
      </nav>
    </div>
  )
}