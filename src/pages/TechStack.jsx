import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import { techStack as techApi } from '../lib/api.js'

function TechStack() {
  const [techItems, setTechItems] = useState([])
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Platform')
  const [monthlyCost, setMonthlyCost] = useState('')
  const [purpose, setPurpose] = useState('')
  const [status, setStatus] = useState('active')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTech = async () => {
      setLoading(true)
      setError('')
      try {
        const response = await techApi.list()
        setTechItems(response.data)
      } catch (err) {
        setError('Unable to load your tech stack.')
      } finally {
        setLoading(false)
      }
    }

    loadTech()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await techApi.create({
        tool_name: name.trim(),
        category: category.trim(),
        monthly_cost: monthlyCost.trim(),
        purpose: purpose.trim(),
        status,
      })
      setTechItems((current) => [response.data, ...current])
      setName('')
      setCategory('Platform')
      setMonthlyCost('')
      setPurpose('')
      setStatus('active')
    } catch (err) {
      setError('Unable to save tech item.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await techApi.remove(id)
      setTechItems((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      setError('Unable to remove tech item.')
    }
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Tech Stack Tracker</h1>
        <p className="reveal">Manage your tools with real entries saved to your account.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Saved Tools</h2>
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
          ) : techItems.length > 0 ? (
          <div className="tools-grid">
            {techItems.map((item) => (
              <div key={item.id} className="tool-card tool-card-with-delete">
                <ToolCard
                  icon={item.category?.charAt(0) || '🧩'}
                  title={item.tool_name}
                  description={`${item.purpose} • ${item.category}`}
                  status={item.status}
                  count={item.monthly_cost ? `$${item.monthly_cost}` : null}
                />
                <button type="button" className="delete-btn" onClick={() => handleDelete(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No tools added yet. Add your first tool.</div>
        )}
      </section>

      <section className="section reveal">
        <h2 className="section-title">Add Tool</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tool-name">Tool Name</label>
              <input
                id="tool-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Calendar, CRM, Analytics"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tool-category">Category</label>
              <select id="tool-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Platform</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Operations</option>
                <option>Analytics</option>
                <option>Support</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tool-cost">Monthly Cost</label>
              <input
                id="tool-cost"
                type="number"
                min="0"
                value={monthlyCost}
                onChange={(e) => setMonthlyCost(e.target.value)}
                placeholder="e.g., 49"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="tool-status">Status</label>
              <select id="tool-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tool-purpose">Purpose</label>
            <input
              id="tool-purpose"
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Why this tool is part of your stack"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Tool</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default TechStack
