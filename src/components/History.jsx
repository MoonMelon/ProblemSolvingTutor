import { BookOpenIcon, ArrowRightIcon } from './Icons.jsx'

const SESSIONS = [
  {
    id: 1,
    title: 'Last Digit of 7²⁰²³',
    date: 'Jul 14, 2026',
    topic: 'Number Theory',
    status: 'Completed',
    source: 'Verified problem',
    contest: 'AMC 8',
    badge: 'verified',
  },
  {
    id: 2,
    title: 'Triangle Area from Altitude',
    date: 'Jul 12, 2026',
    topic: 'Geometry',
    status: 'In progress',
    source: 'Verified problem',
    contest: 'AMC 10',
    badge: 'verified',
  },
  {
    id: 3,
    title: 'Uploaded algebra problem',
    date: 'Jul 10, 2026',
    topic: 'Algebra',
    status: 'Completed',
    source: 'Solution supplied',
    contest: null,
    badge: 'supplied',
  },
  {
    id: 4,
    title: 'Committee Selection',
    date: 'Jul 7, 2026',
    topic: 'Counting & Probability',
    status: 'Completed',
    source: 'AI analyzed',
    contest: 'AIME',
    badge: 'ai',
  },
]

function sourceBadge(badge) {
  if (badge === 'verified') return <span className="badge badge--verified">Verified problem</span>
  if (badge === 'supplied') return <span className="badge badge--supplied">Solution supplied</span>
  return <span className="badge badge--ai">AI analyzed</span>
}

function statusBadge(status) {
  if (status === 'Completed')  return <span className="badge badge--done">Completed</span>
  if (status === 'In progress') return <span className="badge badge--progress">In progress</span>
  return <span className="badge badge--neutral">{status}</span>
}

export default function History({ navigate }) {
  return (
    <div className="page">
      <div className="mb-32">
        <h1 className="h-lg mb-8">History</h1>
        <p className="body">Your past tutoring sessions.</p>
      </div>

      {SESSIONS.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <p className="h-sm mb-8">No sessions yet</p>
          <p className="body mb-20">Start by browsing problems or uploading your own.</p>
          <button className="btn btn--primary" onClick={() => navigate('home')}>
            Go to practice
            <ArrowRightIcon size={15} />
          </button>
        </div>
      ) : (
        <div className="hist-list">
          {SESSIONS.map(s => (
            <div key={s.id} className="hist-item">
              {/* Icon */}
              <div className="hist-icon">
                <BookOpenIcon size={20} />
              </div>

              {/* Body */}
              <div className="hist-body">
                <p className="hist-title">{s.title}</p>
                <div className="hist-tags">
                  {statusBadge(s.status)}
                  {sourceBadge(s.badge)}
                  <span className="badge badge--neutral">{s.topic}</span>
                  {s.contest && (
                    <span className="badge badge--contest">{s.contest}</span>
                  )}
                </div>
              </div>

              {/* Date */}
              <span className="hist-date">{s.date}</span>

              {/* Actions */}
              <div className="hist-actions">
                <button
                  className="btn btn--primary btn--sm"
                  onClick={() => navigate('workspace', {})}
                >
                  {s.status === 'In progress' ? 'Resume' : 'Review'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
