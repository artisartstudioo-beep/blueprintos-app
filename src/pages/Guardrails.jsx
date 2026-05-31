import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CanvasCard from '../components/CanvasCard'
import { guardrails as guardrailsApi } from '../lib/api.js'

function Guardrails() {
  const [guardrails, setGuardrails] = useState([])
  const [category, setCategory] = useState('Quality')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadGuardrails = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await guardrailsApi.list()
        setGuardrails(response.data)
      } catch (err) {
        setError('Unable to load guardrails.')
      } finally {
        setLoading(false)
      }
    }

    loadGuardrails()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await guardrailsApi.create({
        rule_title: title.trim() || 'New guardrail',
        category: category.trim() || 'General',
        rule_description: description.trim() || 'No description',
      })
      setGuardrails((current) => [response.data, ...current])
      setTitle('')
      setDescription('')
      setCategory('Quality')
    } catch (err) {
      setError('Unable to save guardrail.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await guardrailsApi.remove(id)
      setGuardrails((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      setError('Unable to remove guardrail.')
    }
  }

  const groupedGuardrails = guardrails.reduce((groups, item) => {
    const key = item.category || 'General'
    if (!groups[key]) groups[key] = []
    groups[key].push(item)
    return groups
  }, {})

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Guardrails</h1>
        <p className="reveal">Quality, compliance, and best practices standards.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Saved Guardrails</h2>
        {error && (
          <div className="form-error">
            {error}
            {(error.toLowerCase().includes('unauthorized') || error.toLowerCase().includes('login')) && (
              <div style={{marginTop:8}}>
                <Link to="/login" className="btn" style={{marginRight:8}}>Login</Link>
                <Link to="/register" className="btn-ghost">Register</Link>
              </div>
            )}
          </div>
        )}
        {loading ? (
          <div className="empty-state">Loading…</div>
        ) : guardrails.length > 0 ? (
          <div className="canvas-grid">
            {Object.keys(groupedGuardrails).map((categoryKey) => (
              <CanvasCard
                key={categoryKey}
                title={categoryKey}
                items={groupedGuardrails[categoryKey].map((item) => ({ label: item.rule_title, value: item.rule_description }))}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">No rules yet. Add your first guardrail.</div>
        )}

        {guardrails.length > 0 && (
          <div className="item-list">
            {guardrails.map((item) => (
              <div key={item.id} className="item-row">
                <div>
                  <strong>{item.rule_title}</strong>
                  <div className="item-meta">{item.category} • {item.rule_description}</div>
                </div>
                <button className="delete-btn" type="button" onClick={() => handleDelete(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section reveal">
        <h2 className="section-title">Add Guardrail</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="guardrail-category">Category</label>
              <select id="guardrail-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Quality</option>
                <option>Performance</option>
                <option>Security</option>
                <option>Accessibility</option>
                <option>Documentation</option>
                <option>General</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="guardrail-title">Title</label>
              <input
                id="guardrail-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Enforce linting"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="guardrail-description">Description</label>
            <input
              id="guardrail-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the guardrail"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Guardrail</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Guardrails
