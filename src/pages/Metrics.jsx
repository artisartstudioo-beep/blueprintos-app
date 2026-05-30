import { useEffect, useState } from 'react'
import MetricCard from '../components/MetricCard'
import { metrics as metricsApi } from '../lib/api.js'

function Metrics() {
  const [metrics, setMetrics] = useState([])
  const [label, setLabel] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await metricsApi.list()
        setMetrics(response.data)
      } catch (err) {
        setError('Unable to load metrics. Please login and try again.')
      }
    }

    loadMetrics()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await metricsApi.create({
        metric_name: label.trim(),
        value: value.trim(),
        date,
        notes: notes.trim(),
      })
      setMetrics((current) => [response.data, ...current])
      setLabel('')
      setValue('')
      setDate('')
      setNotes('')
    } catch (err) {
      setError('Unable to save metric.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await metricsApi.remove(id)
      setMetrics((current) => current.filter((metric) => metric.id !== id))
    } catch (err) {
      setError('Unable to delete metric.')
    }
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Metrics Tracker</h1>
        <p className="reveal">Monitor the KPIs you define and save them to your account.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Saved Metrics</h2>
        {error && <div className="form-error">{error}</div>}
        {metrics.length > 0 ? (
          <div className="metrics-grid metrics-large">
            {metrics.map((metric) => (
              <div key={metric.id} className="metric-card metric-card-with-delete">
                <MetricCard
                  label={metric.metric_name}
                  value={metric.value}
                  date={metric.date}
                  notes={metric.notes}
                />
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(metric.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No metrics saved yet. Add your first metric to begin tracking.</div>
        )}
      </section>

      <section className="section reveal">
        <h2 className="section-title">Add Metric</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="metric-label">Metric Name</label>
              <input
                id="metric-label"
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g., Monthly Active Users"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="metric-value">Value</label>
              <input
                id="metric-value"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="e.g., 12,400"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="metric-date">Date</label>
              <input
                id="metric-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="metric-notes">Notes</label>
              <input
                id="metric-notes"
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional context or notes"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Metric</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Metrics
