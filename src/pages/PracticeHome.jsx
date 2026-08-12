import { useAuth } from '../auth/AuthContext.jsx'

// keep your other imports here too
// BookOpenIcon, UploadIcon, ArrowRightIcon, etc.

export default function PracticeHome({ navigate }) {
  const { user, isAdmin } = useAuth()

  return (
    <div>
      {/* TEMPORARY LOGIN/ADMIN TEST */}
      <div
        style={{
          background: 'white',
          color: 'black',
          padding: 12,
          marginBottom: 24,
          borderRadius: 8,
        }}
      >
        <p>Logged in: {user ? user.email : 'nobody'}</p>
        <p>Admin: {isAdmin ? 'YES' : 'NO'}</p>
      </div>

      {/* Hero */}
      <div
        style={{
          textAlign: 'center',
          maxWidth: 560,
          margin: '0 auto 56px',
        }}
      >
        <h1>Mathematics Tutoring</h1>

        <h2>What would you like help with?</h2>

        <p>
          Choose a problem, show your attempt, and receive step-by-step
          guidance — without being handed the answer.
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
        {/* your existing cards stay here */}
      </div>

      {/* Footer note */}
      <p
        className="body-sm"
        style={{
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        The AI guides you toward the solution — it never gives it away.
      </p>
    </div>
  )
}