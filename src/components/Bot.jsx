import { useState, useRef, useEffect } from 'react'

/* ──────────────────────────────────────────────────────────
   Bot Module — completely separate from all other screens.
   Renders as a floating panel that can be toggled from the
   sidebar, the top bar, or the mobile bottom nav.
────────────────────────────────────────────────────────── */

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hi! I'm your ProofPath Thinking Coach. Ask me about math concepts, problem strategies, or request a practice problem.",
  },
]

const QUICK_REPLIES = [
  { label: 'Explain a concept',  text: 'Can you explain how modular arithmetic works?' },
  { label: 'Strategy help',      text: 'What strategy should I use for last-digit problems?' },
  { label: 'Practice problem',   text: 'Give me a challenging number theory problem.' },
]

/** Very simple keyword-based response engine (placeholder for real AI). */
function getBotReply(userText) {
  const t = userText.toLowerCase()
  if (t.includes('modular') || t.includes('mod')) {
    return 'Modular arithmetic asks: what is the remainder? For example, 17 mod 5 = 2. For competition problems involving large exponents, the key insight is that remainders repeat in a cycle. Find the cycle length, then reduce the exponent to see which residue applies.'
  }
  if (t.includes('last-digit') || t.includes('last digit') || t.includes('cycle')) {
    return 'Last-digit strategy: list the pattern of last digits for the base (e.g. 7 → 7, 9, 3, 1 — period 4; 3 → 3, 9, 7, 1 — period 4). Reduce the exponent modulo the period length, then look up the answer. Verify by re-deriving the cycle from scratch once.'
  }
  if (t.includes('problem') || t.includes('practice')) {
    return "Try this: Find the units digit of 13²⁰²³ + 7²⁰²³.\n\nHint: find the cycles for 13 and 7, reduce 2023 modulo each cycle length, then add the resulting digits and take the last digit of the sum."
  }
  if (t.includes('trigger')) {
    return 'Recognition trigger: "Large exponent + small modulus → find the cycle length for the base, reduce the exponent modulo the period, read off the residue." Write this down and time how fast you can apply it on the next 5 problems.'
  }
  if (t.includes('euler') || t.includes('fermat')) {
    return "Euler's theorem says a^φ(n) ≡ 1 (mod n) when gcd(a, n) = 1. For mod 10 problems, φ(10) = 4, so any base coprime to 10 has period dividing 4. This is a more general approach, but for small moduli the direct cycle method is usually faster and safer."
  }
  return "Great question! For competition math, always ask: (1) What type is this problem? (2) What's the fastest reliable method? (3) Can I verify quickly? For number theory, look for periodicity, divisibility, and invariants first."
}

export default function Bot({ isOpen, onClose }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput]       = useState('')
  const [typing, setTyping]     = useState(false)
  const endRef                  = useRef(null)

  /* Scroll to latest message whenever messages or panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 80)
    }
  }, [messages, isOpen])

  function sendMessage(text = input) {
    const trimmed = text.trim()
    if (!trimmed) return

    setMessages(prev => [...prev, { sender: 'user', text: trimmed }])
    setInput('')
    setTyping(true)

    /* Simulate a short "typing" delay */
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: getBotReply(trimmed) }])
      setTyping(false)
    }, 600 + Math.random() * 400)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const showQuickReplies = messages.length <= 1

  return (
    <div className={`bot-panel ${isOpen ? '' : 'closed'}`} role="dialog" aria-label="Thinking Coach">
      {/* Header */}
      <div className="bot-header">
        <div className="bot-header-left">
          <span className="bot-avatar">🤖</span>
          <div>
            <div className="bot-title">Thinking Coach</div>
            <div className="bot-subtitle">ProofPath AI · Active</div>
          </div>
        </div>
        <button className="bot-close" onClick={onClose} aria-label="Close coach">✕</button>
      </div>

      {/* Messages */}
      <div className="bot-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.sender}`}>
            <div className="msg-bubble">
              {m.text.split('\n').map((line, j) => (
                <span key={j}>{line}{j < m.text.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}

        {typing && (
          <div className="msg bot">
            <div className="msg-bubble" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
              Thinking…
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Quick-reply chips (shown only at start) */}
      {showQuickReplies && (
        <div className="bot-quick-replies">
          {QUICK_REPLIES.map(q => (
            <button
              key={q.label}
              className="btn secondary sm"
              style={{ fontSize: 11 }}
              onClick={() => sendMessage(q.text)}
            >
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="bot-input-area">
        <input
          className="bot-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask the coach anything…"
          aria-label="Message input"
        />
        <button
          className="bot-send"
          onClick={() => sendMessage()}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  )
}
