import { useState, useRef, useEffect } from 'react'
import { ArrowLeftIcon, SendIcon, MicIcon, PaperclipIcon, ShieldCheckIcon, InfoIcon, AlertTriangleIcon, ArrowRightIcon } from '../components/Icons.jsx'
import { sendChatMessage } from '../api.js'

// Fallback shown only when the backend is unreachable
const FALLBACK_MSG = {
  role: 'ai',
  type: 'structured',
  correct: 'Your attempt has been received.',
  issue:   'The AI coach could not be reached right now.',
  hint:    'Check that the backend is running on port 8000 and your OPENAI_API_KEY is set.',
  prompt:  'Once the backend is running, resubmit your attempt to receive real feedback.',
}

function BadgeStrip({ ctx }) {
  if (ctx.badge === 'verified') {
    return (
      <span className="badge badge--verified" style={{ gap: 5 }}>
        <ShieldCheckIcon size={12} /> Verified solution
      </span>
    )
  }
  if (ctx.badge === 'supplied') {
    return (
      <span className="badge badge--supplied" style={{ gap: 5 }}>
        <InfoIcon size={12} /> Solution supplied
      </span>
    )
  }
  return (
    <span className="badge badge--ai" style={{ gap: 5 }}>
      <AlertTriangleIcon size={12} /> AI-analyzed problem
    </span>
  )
}

function StructuredBubble({ msg }) {
  return (
    <div className="msg__bubble">
      <div className="msg-section">
        <span className="msg-section__label msg-section__label--green">✓ What you did correctly</span>
        <p style={{ fontSize: '.875rem', lineHeight: 1.7 }}>{msg.correct}</p>
      </div>
      <div className="msg-section">
        <span className="msg-section__label msg-section__label--red">✗ What to check</span>
        <p style={{ fontSize: '.875rem', lineHeight: 1.7 }}>{msg.issue}</p>
      </div>
      <div className="msg-section">
        <span className="msg-section__label msg-section__label--amber">→ One focused hint</span>
        <p style={{ fontSize: '.875rem', lineHeight: 1.7 }}>{msg.hint}</p>
      </div>
      <div className="msg-section">
        <span className="msg-section__label msg-section__label--blue">↩ Your turn</span>
        <p style={{ fontSize: '.875rem', lineHeight: 1.7 }}>{msg.prompt}</p>
      </div>
    </div>
  )
}

export default function TutoringWorkspace({ navigate, ctx }) {
  const initialMsg = ctx.aiResponse
    ? { role: 'ai', type: 'structured', ...ctx.aiResponse }
    : FALLBACK_MSG

  const [messages,  setMessages]  = useState([initialMsg])
  const [inputText, setInputText] = useState('')
  const [thinking,  setThinking]  = useState(false)
  const endRef = useRef(null)

  const title     = ctx.title     || ctx.problem?.title || 'Problem'
  const statement = ctx.problem?.statement || ctx.problemText || ''
  const attempt   = ctx.attempt   || ''

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, thinking])

  async function sendMessage() {
    const text = inputText.trim()
    if (!text || thinking) return

    const userMsg = { role: 'user', type: 'text', text }
    setMessages(prev => [...prev, userMsg])
    setInputText('')
    setThinking(true)

    // Build the conversation history for the backend (exclude the structured first message)
    const history = [...messages, userMsg]
      .filter(m => m.type !== 'structured')
      .map(m => ({
        role:    m.role === 'ai' ? 'assistant' : 'user',
        content: m.text,
      }))

    try {
      const { reply } = await sendChatMessage({
        problem:          statement,
        studentAttempt:   attempt,
        conversation:     history,
        officialSolution: ctx.solutionText || null,
      })
      setMessages(prev => [...prev, { role: 'ai', type: 'text', text: reply }])
    } catch (err) {
      console.error(err)
      setMessages(prev => [...prev, {
        role: 'ai', type: 'text',
        text: 'I could not reach the server. Please check that the backend is running and try again.',
      }])
    } finally {
      setThinking(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="workspace">
      {/* Top bar */}
      <div className="flex items-center gap-12 mb-24">
        <button
          className="btn btn--ghost btn--sm"
          onClick={() => navigate('attempt', {})}
        >
          <ArrowLeftIcon size={15} />
          Back
        </button>
        <div style={{ flex: 1 }}>
          <p className="eyebrow mb-2">
            {ctx.source === 'library'
              ? `${ctx.problem?.contest} · ${ctx.problem?.topic}`
              : 'Uploaded problem'}
          </p>
          <h1 className="h-sm">{title}</h1>
        </div>
        <button
          className="btn btn--secondary btn--sm"
          onClick={() =>
            navigate('completion', {
              method:  ctx.problem?.topic || 'General reasoning',
              insight: 'The last digits of 7ⁿ cycle with period 4. Use modular arithmetic to find the position.',
            })
          }
        >
          Mark complete
          <ArrowRightIcon size={14} />
        </button>
      </div>

      {/* Two-column layout */}
      <div className="ws-layout">

        {/* ── LEFT: problem context ── */}
        <div className="ws-left">
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Badge */}
            <div>
              <BadgeStrip ctx={ctx} />
            </div>

            {/* Problem */}
            <div>
              <p className="eyebrow mb-10">Problem</p>
              <p style={{ fontSize: '.9rem', lineHeight: 1.8, color: 'var(--text)' }}>
                {statement || <span style={{ color: 'var(--faint)' }}>No statement available.</span>}
              </p>
            </div>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />

            {/* Attempt */}
            <div>
              <p className="eyebrow mb-10">Your attempt</p>
              <p
                style={{
                  fontSize: '.875rem', lineHeight: 1.75, color: 'var(--muted)',
                  background: 'var(--bg)', borderRadius: 'var(--r-sm)',
                  padding: '14px', whiteSpace: 'pre-wrap',
                  fontStyle: attempt ? 'normal' : 'italic',
                }}
              >
                {attempt || 'No attempt recorded.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: chat ── */}
        <div className="ws-right">
          {/* Chat header */}
          <div className="chat-header">
            <div className="chat-avatar">AI</div>
            <div>
              <p className="h-sm">AI Math Coach</p>
              <p className="body-sm" style={{ marginTop: 1 }}>Guiding you to the solution</p>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-msgs">
            {messages.map((msg, i) => (
              <div key={i} className={`msg msg--${msg.role}`}>
                <p className="msg__who">{msg.role === 'ai' ? 'AI Math Coach' : 'You'}</p>
                {msg.type === 'structured'
                  ? <StructuredBubble msg={msg} />
                  : <div className="msg__bubble">{msg.text}</div>
                }
              </div>
            ))}
            {thinking && (
              <div className="msg msg--ai">
                <p className="msg__who">AI Math Coach</p>
                <div className="msg__bubble" style={{ opacity: 0.55, fontStyle: 'italic' }}>Thinking…</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input area */}
          <div className="chat-footer">
            <button className="btn--icon btn" title="Upload work">
              <PaperclipIcon size={16} />
            </button>
            <button className="btn--icon btn" title="Record explanation">
              <MicIcon size={16} />
            </button>
            <textarea
              className="chat-input"
              placeholder="Continue working on the problem…"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              disabled={thinking}
            />
            <button
              className="chat-send"
              disabled={thinking || !inputText.trim()}
              onClick={sendMessage}
              disabled={!inputText.trim()}
            >
              <SendIcon size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
