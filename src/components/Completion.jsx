import { ArrowRightIcon, RotateCCWIcon, BookOpenIcon } from './Icons.jsx'

export default function Completion({ navigate, ctx }) {
  const title   = ctx.title   || ctx.problem?.title || 'Problem'
  const method  = ctx.method  || ctx.problem?.topic || 'Mathematical reasoning'
  const insight = ctx.insight || 'Keep this idea in mind for similar problems.'
  const source  = ctx.badge === 'verified'
    ? 'Verified problem'
    : ctx.badge === 'supplied'
    ? 'Solution supplied'
    : 'AI analyzed'

  return (
    <div className="page">
      <div className="completion">
        {/* Success icon */}
        <div className="completion__icon">✓</div>

        <h1 className="h-lg mb-8">Problem completed</h1>
        <p className="body-lg">
          Good work getting through this problem. Here is a brief summary of your session.
        </p>

        {/* Summary table */}
        <div className="summary card mt-32" style={{ padding: '0 24px' }}>
          <div className="summary__row">
            <span className="summary__label">Problem</span>
            <span className="summary__value" style={{ maxWidth: 280, textAlign: 'right' }}>{title}</span>
          </div>
          <div className="summary__row">
            <span className="summary__label">Method used</span>
            <span className="summary__value">{method}</span>
          </div>
          <div className="summary__row">
            <span className="summary__label">Source</span>
            <span className="summary__value">{source}</span>
          </div>
          <div className="summary__row" style={{ alignItems: 'flex-start' }}>
            <span className="summary__label" style={{ flexShrink: 0, marginRight: 16 }}>Key insight</span>
            <span className="summary__value" style={{ textAlign: 'right' }}>{insight}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="completion__btns">
          <button
            className="btn btn--primary btn--lg"
            onClick={() => navigate('library')}
          >
            <RotateCCWIcon size={16} />
            Try a similar problem
          </button>
          <button
            className="btn btn--secondary btn--lg"
            onClick={() => navigate('workspace', {})}
          >
            <BookOpenIcon size={16} />
            Review solution
          </button>
          <button
            className="btn btn--ghost btn--lg"
            onClick={() => navigate('home')}
          >
            Back to practice
          </button>
        </div>
      </div>
    </div>
  )
}
