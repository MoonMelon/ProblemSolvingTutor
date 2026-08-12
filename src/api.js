const BASE = 'http://localhost:8000'

/**
 * Calls POST /api/analyze.
 * Returns { correct, issue, hint, prompt }
 */
export async function analyzeAttempt({ problem, studentAttempt, officialSolution = null, level = 'beginner' }) {
  const res = await fetch(`${BASE}/api/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problem,
      student_attempt: studentAttempt,
      official_solution: officialSolution,
      level,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`/api/analyze ${res.status}: ${err}`)
  }
  return res.json()
}

/**
 * Calls POST /api/chat.
 * conversation: [{ role: 'user'|'assistant', content: string }]
 * Returns { reply }
 */
export async function sendChatMessage({ problem, studentAttempt, conversation, officialSolution = null }) {
  const res = await fetch(`${BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      problem,
      student_attempt: studentAttempt,
      conversation,
      official_solution: officialSolution,
    }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`/api/chat ${res.status}: ${err}`)
  }
  return res.json()
}
