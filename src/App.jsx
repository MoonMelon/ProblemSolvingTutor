import { useState } from 'react'
import Nav from './components/Nav.jsx'
import PracticeHome from './components/PracticeHome.jsx'
import ProblemLibrary from './components/ProblemLibrary.jsx'
import UploadWizard from './components/UploadWizard.jsx'
import AttemptEntry from './components/AttemptEntry.jsx'
import TutoringWorkspace from './components/TutoringWorkspace.jsx'
import Completion from './components/Completion.jsx'
import History from './components/History.jsx'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [ctx, setCtx] = useState({})

  function navigate(target, data = {}) {
    setCtx(prev => ({ ...prev, ...data }))
    setScreen(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Nav screen={screen} navigate={navigate} />
      {screen === 'home'       && <PracticeHome navigate={navigate} />}
      {screen === 'library'    && <ProblemLibrary navigate={navigate} ctx={ctx} />}
      {screen === 'upload'     && <UploadWizard navigate={navigate} />}
      {screen === 'attempt'    && <AttemptEntry navigate={navigate} ctx={ctx} />}
      {screen === 'workspace'  && <TutoringWorkspace navigate={navigate} ctx={ctx} />}
      {screen === 'completion' && <Completion navigate={navigate} ctx={ctx} />}
      {screen === 'history'    && <History navigate={navigate} />}
    </>
  )
}
