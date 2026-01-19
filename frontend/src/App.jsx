import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setStatus('loading')
    setError(null)
    try {
      const response = await axios.get('/api/test')
      setData(response.data)
      setStatus('connected')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'loading':
        return '#ffa500'
      case 'connected':
        return '#28a745'
      case 'error':
        return '#dc3545'
      default:
        return '#6c757d'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'loading':
        return 'Loading...'
      case 'connected':
        return 'Connected'
      case 'error':
        return 'Error'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="app-container">
      <div className="card">
        <h1>DevOps Architecture Test</h1>

        <div className="status-indicator" style={{ backgroundColor: getStatusColor() }}>
          {getStatusText()}
        </div>

        {status === 'connected' && data && (
          <div className="data-display">
            <div className="data-item">
              <span className="data-label">Visitor Count:</span>
              <span className="data-value">{data.visitorCount}</span>
            </div>
            <div className="data-item">
              <span className="data-label">DB Log Count:</span>
              <span className="data-value">{data.dbLogCount}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Message:</span>
              <span className="data-value">{data.message}</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            <p>Failed to connect to backend</p>
            <p className="error-details">{error}</p>
          </div>
        )}

        <button className="refresh-button" onClick={fetchData} disabled={status === 'loading'}>
          {status === 'loading' ? 'Loading...' : 'Refresh'}
        </button>
      </div>
    </div>
  )
}

export default App
