import { useState } from 'react'
import {
  ArrowLeftIcon, ArrowRightIcon, CheckIcon,
  UploadIcon, FileTextIcon, ImageIcon, AlertTriangleIcon, PlusIcon,
} from './Icons.jsx'

const STEPS = ['Add problem', 'Solution?', 'Add solution']

function StepIndicator({ current }) {
  return (
    <div className="wizard">
      {STEPS.map((label, i) => {
        const state = i < current ? 'done' : i === current ? 'active' : ''
        return (
          <div key={label} className="flex items-center" style={{ flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div className={`wstep wstep--${state || 'idle'}`}>
              <div className="wstep__dot">
                {i < current ? <CheckIcon size={12} /> : i + 1}
              </div>
              <span>{label}</span>
            </div>
            {i < STEPS.length - 1 && <div className="wstep__line" />}
          </div>
        )
      })}
    </div>
  )
}

function Step1AddProblem({ problemTab, setProblemTab, problemText, setProblemText, onContinue, navigate }) {
  const canContinue = problemText.trim().length > 0 || problemTab !== 'type'

  return (
    <>
      <h1 className="h-lg mb-8">Add the problem</h1>
      <p className="body mb-32">Type the problem, or upload a photo or PDF.</p>

      <div className="tabs">
        {['type', 'image', 'pdf'].map(t => (
          <button
            key={t}
            className={`tabs__tab ${problemTab === t ? 'tabs__tab--active' : ''}`}
            onClick={() => setProblemTab(t)}
          >
            {t === 'type' ? 'Type or paste' : t === 'image' ? 'Upload image' : 'Upload PDF'}
          </button>
        ))}
      </div>

      {problemTab === 'type' && (
        <div className="form-group">
          <label className="form-label">Problem text</label>
          <textarea
            className="input textarea"
            style={{ minHeight: 180 }}
            placeholder="Paste or type the problem statement here…"
            value={problemText}
            onChange={e => setProblemText(e.target.value)}
          />
        </div>
      )}

      {problemTab === 'image' && (
        <div
          className="upload-zone"
          onClick={() => {}}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ color: 'var(--primary)', marginBottom: 12 }}><ImageIcon size={36} /></div>
          <p className="h-sm mb-4">Click to upload an image</p>
          <p className="body-sm">PNG, JPG, HEIC — up to 10 MB</p>
        </div>
      )}

      {problemTab === 'pdf' && (
        <div className="upload-zone">
          <div style={{ color: 'var(--primary)', marginBottom: 12 }}><FileTextIcon size={36} /></div>
          <p className="h-sm mb-4">Click to upload a PDF</p>
          <p className="body-sm">PDF — up to 25 MB</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-32">
        <button className="btn btn--ghost" onClick={() => navigate('home')}>
          <ArrowLeftIcon size={15} />
          Cancel
        </button>
        <button
          className="btn btn--primary btn--lg"
          onClick={onContinue}
          disabled={!canContinue}
        >
          Continue
          <ArrowRightIcon size={17} />
        </button>
      </div>
    </>
  )
}

function Step2Solution({ hasSolution, setHasSolution, onBack, onContinue }) {
  return (
    <>
      <h1 className="h-lg mb-8">Do you have a trusted solution?</h1>
      <p className="body mb-32">
        If you have a reliable solution, your guidance will be more accurate.
        It is fine if you don't have one yet.
      </p>

      <div className="option-cards">
        <div
          className={`option-card ${hasSolution === 'yes' ? 'option-card--selected' : ''}`}
          onClick={() => setHasSolution('yes')}
        >
          <div className="option-card__radio" />
          <div className="option-card__body">
            <p className="option-card__title">Yes, I have a solution</p>
            <p className="option-card__desc">Paste or upload your trusted solution in the next step.</p>
          </div>
          <span className="option-card__tag">Recommended</span>
        </div>

        <div
          className={`option-card ${hasSolution === 'no' ? 'option-card--selected' : ''}`}
          onClick={() => setHasSolution('no')}
        >
          <div className="option-card__radio" />
          <div className="option-card__body">
            <p className="option-card__title">No, let the AI analyze the problem</p>
            <p className="option-card__desc">The AI will propose a solution path and guide you from there.</p>
          </div>
        </div>
      </div>

      {hasSolution === 'no' && (
        <div className="notice notice--warn mt-20">
          <span className="notice__icon"><AlertTriangleIcon size={16} /></span>
          <span>
            The AI will propose a solution path for this problem. Because no trusted
            solution was supplied, some guidance may be less reliable.
          </span>
        </div>
      )}

      <div className="flex justify-between items-center mt-32">
        <button className="btn btn--ghost" onClick={onBack}>
          <ArrowLeftIcon size={15} />
          Back
        </button>
        <button
          className="btn btn--primary btn--lg"
          onClick={onContinue}
          disabled={hasSolution === null}
        >
          Continue
          <ArrowRightIcon size={17} />
        </button>
      </div>
    </>
  )
}

function Step3AddSolution({ solutionTab, setSolutionTab, solutionText, setSolutionText, onBack, onFinish }) {
  return (
    <>
      <h1 className="h-lg mb-8">Add your solution</h1>
      <p className="body mb-32">
        Paste or upload the trusted solution. You can add more than one solution path.
      </p>

      <div className="tabs">
        {['paste', 'image', 'pdf'].map(t => (
          <button
            key={t}
            className={`tabs__tab ${solutionTab === t ? 'tabs__tab--active' : ''}`}
            onClick={() => setSolutionTab(t)}
          >
            {t === 'paste' ? 'Paste solution' : t === 'image' ? 'Upload image' : 'Upload PDF'}
          </button>
        ))}
      </div>

      {solutionTab === 'paste' && (
        <div className="form-group">
          <label className="form-label">Solution text</label>
          <textarea
            className="input textarea"
            style={{ minHeight: 180 }}
            placeholder="Paste the full solution here…"
            value={solutionText}
            onChange={e => setSolutionText(e.target.value)}
          />
        </div>
      )}

      {solutionTab === 'image' && (
        <div className="upload-zone">
          <div style={{ color: 'var(--primary)', marginBottom: 12 }}><ImageIcon size={36} /></div>
          <p className="h-sm mb-4">Click to upload a solution image</p>
          <p className="body-sm">PNG, JPG, HEIC — up to 10 MB</p>
        </div>
      )}

      {solutionTab === 'pdf' && (
        <div className="upload-zone">
          <div style={{ color: 'var(--primary)', marginBottom: 12 }}><FileTextIcon size={36} /></div>
          <p className="h-sm mb-4">Click to upload a solution PDF</p>
          <p className="body-sm">PDF — up to 25 MB</p>
        </div>
      )}

      <button className="btn btn--ghost btn--sm mt-12" style={{ alignSelf: 'flex-start' }}>
        <PlusIcon size={14} />
        Add another solution
      </button>

      <div className="flex justify-between items-center mt-32">
        <button className="btn btn--ghost" onClick={onBack}>
          <ArrowLeftIcon size={15} />
          Back
        </button>
        <button className="btn btn--primary btn--lg" onClick={onFinish}>
          Continue to attempt
          <ArrowRightIcon size={17} />
        </button>
      </div>
    </>
  )
}

export default function UploadWizard({ navigate }) {
  const [step, setStep]               = useState(0)
  const [problemTab, setProblemTab]   = useState('type')
  const [problemText, setProblemText] = useState('')
  const [hasSolution, setHasSolution] = useState(null)
  const [solutionTab, setSolutionTab] = useState('paste')
  const [solutionText, setSolutionText] = useState('')

  function finishWizard() {
    const badge = hasSolution === 'yes' ? 'supplied' : 'ai'
    navigate('attempt', {
      source: 'upload',
      problemText,
      hasSolution,
      solutionText,
      badge,
    })
  }

  return (
    <div className="page--narrow">
      <StepIndicator current={step} />

      {step === 0 && (
        <Step1AddProblem
          problemTab={problemTab} setProblemTab={setProblemTab}
          problemText={problemText} setProblemText={setProblemText}
          onContinue={() => setStep(1)}
          navigate={navigate}
        />
      )}

      {step === 1 && (
        <Step2Solution
          hasSolution={hasSolution} setHasSolution={setHasSolution}
          onBack={() => setStep(0)}
          onContinue={() => hasSolution === 'yes' ? setStep(2) : finishWizard()}
        />
      )}

      {step === 2 && (
        <Step3AddSolution
          solutionTab={solutionTab} setSolutionTab={setSolutionTab}
          solutionText={solutionText} setSolutionText={setSolutionText}
          onBack={() => setStep(1)}
          onFinish={finishWizard}
        />
      )}
    </div>
  )
}
