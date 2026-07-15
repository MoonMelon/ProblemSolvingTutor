import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, MicIcon, ImageIcon } from './Icons.jsx'

function getProblemStatement(ctx) {
  if (ctx.source === 'library') return ctx.problem?.statement || ''
  return ctx.problemText || ''
}

function getProblemTitle(ctx) {
  if (ctx.source === 'library') return ctx.problem?.title || 'Problem'
  return 'Uploaded problem'
}

export default function AttemptEntry({ navigate, ctx }) {
  const [tab, setTab]         = useState('type')
  const [attempt, setAttempt] = useState('')

  const statement = getProblemStatement(ctx)
  const title     = getProblemTitle(ctx)

  function submit() {
    navigate('workspace', { attempt, title })
  }

  return (
    <div className="page--narrow">
      {/* Header */}
      <div className="flex items-center gap-12 mb-32">
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => navigate(ctx.source === 'library' ? 'library' : 'upload')}
        >
          <ArrowLeftIcon size={15} />
          Back
        </button>
        <div style={{ flex: 1 }}>
          <p className="eyebrow mb-4">
            {ctx.source === 'library' ? `${ctx.problem?.contest} · ${ctx.problem?.topic}` : 'Uploaded problem'}
          </p>
          <h1 className="h-md">{title}</h1>
        </div>
        <BadgeCtx ctx={ctx} />
      </div>

      {/* Problem statement */}
      <div>
        <p className="eyebrow mb-12">The problem</p>
        <div className="prob-display">
          {statement || <span style={{ color: 'var(--faint)' }}>Problem statement will appear here.</span>}
        </div>
      </div>

      {/* Attempt input */}
      <div className="mt-32">
        <p className="eyebrow mb-16">Your attempt</p>

        <div className="tabs">
          {[
            { key: 'type',   label: 'Type or paste work' },
            { key: 'upload', label: 'Upload handwritten work' },
            { key: 'record', label: 'Record an explanation' },
          ].map(t => (
            <button
              key={t.key}
              className={`tabs__tab ${tab === t.key ? 'tabs__tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'type' && (
          <div className="form-group">
            <textarea
              className="input textarea"
              style={{ minHeight: 220 }}
              placeholder="Show your work here. Write as much or as little as you have — even a rough start is helpful."
              value={attempt}
              onChange={e => setAttempt(e.target.value)}
            />
          </div>
        )}

        {tab === 'upload' && (
          <div className="upload-zone">
            <div style={{ color: 'var(--primary)', marginBottom: 12 }}><ImageIcon size={36} /></div>
            <p className="h-sm mb-4">Click to upload your handwritten work</p>
            <p className="body-sm">PNG, JPG, HEIC — up to 10 MB</p>
          </div>
        )}

        {tab === 'record' && (
          <div className="upload-zone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ color: 'var(--primary)', marginBottom: 12 }}><MicIcon size={36} /></div>
            <p className="h-sm mb-4">Click to start recording</p>
            <p className="body-sm">Explain your thinking out loud — up to 5 minutes</p>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-between items-center mt-32">
        <p className="body-sm" style={{ maxWidth: 320 }}>
          Don't worry if your attempt is incomplete. The AI will work with whatever you have.
        </p>
        <button
          className="btn btn--primary btn--lg"
          onClick={submit}
          disabled={tab === 'type' && attempt.trim().length === 0}
        >
          Submit my attempt
          <ArrowRightIcon size={17} />
        </button>
      </div>
    </div>
  )
}

// Small inline component to show the content-status badge
function BadgeCtx({ ctx }) {
  if (ctx.badge === 'verified') {
    return <span className="badge badge--verified">✓ Verified solution</span>
  }
  if (ctx.badge === 'supplied') {
    return <span className="badge badge--supplied">Solution supplied</span>
  }
  return <span className="badge badge--ai">AI analyzed</span>
}
