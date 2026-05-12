'use client'

export default function GlobalError({ error, reset }) {
  return (
    <div className="error-container">
      <h2>Oops! Something went wrong</h2>
      <p>Don't worry, our team has been notified.</p>
      <details>
        <summary>Error Details (for developers)</summary>
        <pre>{error.message}</pre>
      </details>
      <button 
        onClick={reset}
        className="retry-button"
      >
        Try Again
      </button>
    </div>
  )
}