// ─────────────────────────────────────────────────────────
//  ErrorBoundary.jsx
//  Global error handler untuk React errors
//  Prevents white screen of death
// ─────────────────────────────────────────────────────────

import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error untuk debugging
    console.error('[ErrorBoundary]', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.container}>
          <div style={styles.content}>
            <h1 style={styles.title}>⚠️ Oops! Something went wrong</h1>
            <p style={styles.message}>
              We apologize for the inconvenience. An error occurred while rendering this page.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error details (development only)</summary>
                <pre style={styles.pre}>{this.state.error?.toString()}</pre>
              </details>
            )}
            <button onClick={this.resetError} style={styles.button}>
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    fontFamily: 'DM Sans, sans-serif',
  },
  content: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
  },
  title: {
    fontSize: '32px',
    margin: '0 0 20px 0',
    color: '#333',
  },
  message: {
    fontSize: '18px',
    color: '#666',
    marginBottom: '20px',
    lineHeight: '1.6',
  },
  details: {
    marginTop: '20px',
    textAlign: 'left',
  },
  summary: {
    cursor: 'pointer',
    color: '#0066cc',
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '6px',
  },
  pre: {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '6px',
    overflow: 'auto',
    fontSize: '12px',
    color: '#999',
  },
  button: {
    marginTop: '20px',
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
}

export default ErrorBoundary
