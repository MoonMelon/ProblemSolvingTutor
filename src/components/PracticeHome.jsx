import { ArrowRightIcon, BookOpenIcon, UploadIcon } from './Icons.jsx'

export default function PracticeHome({ navigate }) {
  return (
    <div className="page">
      {/* Hero */}
      <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 56px' }}>
        <p className="eyebrow mb-12">Mathematics Tutoring</p>
        <h1 className="h-xl mb-16">What would you like help with?</h1>
        <p className="body-lg">
          Choose a problem, show your attempt, and receive step-by-step guidance
          — without being handed the answer.
        </p>
      </div>

      {/* Two cards */}
      <div
        className="home-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          maxWidth: 780,
          margin: '0 auto',
        }}
      >
        {/* Primary card */}
        <div
          className="card card--accent"
          style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '32px 28px' }}
        >
          <div>
            <div
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'var(--primary)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}
            >
              <BookOpenIcon size={22} />
            </div>
            <h2 className="h-md mb-8">Practice a verified problem</h2>
            <p className="body mt-8">
              Choose a problem from a trusted library. Solutions are already
              verified, so your guidance will be precise.
            </p>
          </div>
          <button
            className="btn btn--primary btn--lg"
            onClick={() => navigate('library')}
            style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
          >
            Browse problems
            <ArrowRightIcon size={17} />
          </button>
        </div>

        {/* Secondary card */}
        <div
          className="card"
          style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: '32px 28px' }}
        >
          <div>
            <div
              style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'var(--bg)', border: '1.5px solid var(--border)',
                color: 'var(--muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 18,
              }}
            >
              <UploadIcon size={22} />
            </div>
            <h2 className="h-md mb-8">Upload your own problem</h2>
            <p className="body mt-8">
              Add your own problem and, when available, include a trusted
              solution to improve the quality of guidance.
            </p>
          </div>
          <button
            className="btn btn--secondary btn--lg"
            onClick={() => navigate('upload')}
            style={{ marginTop: 'auto', alignSelf: 'flex-start' }}
          >
            Upload problem
            <ArrowRightIcon size={17} />
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p className="body-sm" style={{ textAlign: 'center', marginTop: 40 }}>
        The AI guides you toward the solution — it never gives it away.
      </p>
    </div>
  )
}
