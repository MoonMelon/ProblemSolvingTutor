import { useState } from 'react'

import Nav from './components/Nav.jsx'

import PracticeHome from './pages/PracticeHome.jsx'
import ProblemLibrary from './pages/ProblemLibrary.jsx'
import UploadWizard from './pages/UploadWizard.jsx'
import TutoringWorkspace from './pages/TutoringWorkspace.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'

import AttemptEntry from './components/AttemptEntry.jsx'
import Completion from './components/Completion.jsx'
import History from './components/History.jsx'

export default function App() {
  const [screen, setScreen] = useState('login')
  const [ctx, setCtx] = useState({})

  function navigate(target, data = {}) {
    setCtx(prev => ({
      ...prev,
      ...data
    }))

    setScreen(target)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {screen !== 'login' && screen !== 'signup' && (
        <Nav
          screen={screen}
          navigate={navigate}
        />
      )}

      {screen === 'login' && (
        <LoginPage navigate={navigate} />
      )}

      {screen === 'signup' && (
        <SignupPage navigate={navigate} />
      )}

      {screen === 'home' && (
        <PracticeHome navigate={navigate} />
      )}

      {screen === 'library' && (
        <ProblemLibrary
          navigate={navigate}
          ctx={ctx}
        />
      )}

      {screen === 'upload' && (
        <UploadWizard navigate={navigate} />
      )}

      {screen === 'attempt' && (
        <AttemptEntry
          navigate={navigate}
          ctx={ctx}
        />
      )}

      {screen === 'workspace' && (
        <TutoringWorkspace
          navigate={navigate}
          ctx={ctx}
        />
      )}

      {screen === 'completion' && (
        <Completion
          navigate={navigate}
          ctx={ctx}
        />
      )}

      {screen === 'history' && (
        <History navigate={navigate} />
      )}
    </>
  )
}
