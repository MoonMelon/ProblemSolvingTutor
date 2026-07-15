import { useState } from 'react'
import { ArrowLeftIcon, ClockIcon, ArrowRightIcon } from './Icons.jsx'

const PROBLEMS = [
  {
    id: 1,
    title: 'Last Digit of 7²⁰²³',
    contest: 'AMC 8',
    topic: 'Number Theory',
    difficulty: 'Introductory',
    time: '5–8 min',
    statement: 'What is the last (units) digit of 7²⁰²³?',
  },
  {
    id: 2,
    title: 'Triangle Area from Altitude',
    contest: 'AMC 10',
    topic: 'Geometry',
    difficulty: 'Medium',
    time: '8–12 min',
    statement: 'In triangle ABC, the altitude from vertex A to side BC has length 6, and BC = 10. What is the area of triangle ABC?',
  },
  {
    id: 3,
    title: 'Integer Roots of a Quadratic',
    contest: 'AMC 12',
    topic: 'Algebra',
    difficulty: 'Medium',
    time: '10–14 min',
    statement: 'For how many integer values of k does x² + kx + 12 = 0 have two distinct integer roots?',
  },
  {
    id: 4,
    title: 'Committee with At Least 2 Women',
    contest: 'AIME',
    topic: 'Counting & Probability',
    difficulty: 'Challenging',
    time: '20–30 min',
    statement: 'A committee of 5 is chosen from 4 women and 6 men. In how many ways can the committee be formed if it must contain at least 2 women?',
  },
  {
    id: 5,
    title: 'Solving a Two-Variable System',
    contest: 'AMC 8',
    topic: 'Algebra',
    difficulty: 'Introductory',
    time: '4–6 min',
    statement: 'If 3x + 2 = 17 and 2y − 3 = 11, what is the value of x + y?',
  },
  {
    id: 6,
    title: 'Counting Perfect Square Divisors',
    contest: 'AMC 10',
    topic: 'Number Theory',
    difficulty: 'Medium',
    time: '8–12 min',
    statement: 'How many positive integers less than 200 have an odd number of positive divisors?',
  },
]

const DIFFICULTY_COLOR = {
  Introductory: { bg: '#f0fdf4', color: '#16a34a' },
  Medium:       { bg: '#eff6ff', color: '#2563eb' },
  Challenging:  { bg: '#fef3c7', color: '#b45309' },
}

export default function ProblemLibrary({ navigate }) {
  const [contest,    setContest]    = useState('All')
  const [topic,      setTopic]      = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  const filtered = PROBLEMS.filter(p =>
    (contest    === 'All' || p.contest    === contest)    &&
    (topic      === 'All' || p.topic      === topic)      &&
    (difficulty === 'All' || p.difficulty === difficulty)
  )

  function startProblem(problem) {
    navigate('attempt', { source: 'library', problem, badge: 'verified' })
  }

  return (
    <div className="page">
      {/* Header */}
      <div className="flex items-center gap-12 mb-32">
        <button className="btn btn--ghost btn--sm" onClick={() => navigate('home')}>
          <ArrowLeftIcon size={15} />
          Back
        </button>
        <div>
          <h1 className="h-lg">Problem library</h1>
          <p className="body mt-4">All problems have verified solutions available.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <select className="filter" value={contest} onChange={e => setContest(e.target.value)}>
          <option value="All">All contests</option>
          <option value="AMC 8">AMC 8</option>
          <option value="AMC 10">AMC 10</option>
          <option value="AMC 12">AMC 12</option>
          <option value="AIME">AIME</option>
        </select>

        <select className="filter" value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="All">All topics</option>
          <option value="Algebra">Algebra</option>
          <option value="Geometry">Geometry</option>
          <option value="Number Theory">Number Theory</option>
          <option value="Counting & Probability">Counting &amp; Probability</option>
        </select>

        <select className="filter" value={difficulty} onChange={e => setDifficulty(e.target.value)}>
          <option value="All">All difficulties</option>
          <option value="Introductory">Introductory</option>
          <option value="Medium">Medium</option>
          <option value="Challenging">Challenging</option>
        </select>

        {filtered.length < PROBLEMS.length && (
          <span className="body-sm" style={{ marginLeft: 'auto' }}>
            {filtered.length} problem{filtered.length !== 1 ? 's' : ''} shown
          </span>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p className="h-sm mb-8">No problems match these filters</p>
          <p className="body">Try adjusting the contest, topic, or difficulty.</p>
        </div>
      ) : (
        <div className="problem-grid">
          {filtered.map(p => {
            const diff = DIFFICULTY_COLOR[p.difficulty] || DIFFICULTY_COLOR.Medium
            return (
              <div
                key={p.id}
                className="prob-card"
                onClick={() => startProblem(p)}
              >
                {/* Meta badges */}
                <div className="prob-card__meta">
                  <span className="badge badge--contest">{p.contest}</span>
                  <span className="badge badge--neutral">{p.topic}</span>
                  <span
                    className="badge"
                    style={{ background: diff.bg, color: diff.color }}
                  >
                    {p.difficulty}
                  </span>
                </div>

                {/* Title */}
                <p className="prob-card__title">{p.title}</p>

                {/* Footer */}
                <div className="prob-card__footer">
                  <span className="prob-card__time">
                    <ClockIcon size={13} />
                    {p.time}
                  </span>
                  <button
                    className="btn btn--primary btn--sm"
                    onClick={e => { e.stopPropagation(); startProblem(p) }}
                  >
                    Start
                    <ArrowRightIcon size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
