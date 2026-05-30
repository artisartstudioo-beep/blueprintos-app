import { useEffect, useMemo, useState } from 'react'
import { funnels as funnelsApi } from '../lib/api.js'

function FunnelBuilder() {
  const [stages, setStages] = useState([])
  const [stageName, setStageName] = useState('')
  const [conversion, setConversion] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadStages = async () => {
      try {
        const response = await funnelsApi.list()
        setStages(response.data)
      } catch (err) {
        setError('Unable to load funnel stages.')
      }
    }

    loadStages()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await funnelsApi.create({
        stage_name: stageName.trim(),
        description: description.trim(),
        conversion_percentage: Number(conversion) || 0,
      })
      setStages((current) => [response.data, ...current])
      setStageName('')
      setConversion('')
      setDescription('')
    } catch (err) {
      setError('Unable to save funnel stage.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await funnelsApi.remove(id)
      setStages((current) => current.filter((stage) => stage.id !== id))
    } catch (err) {
      setError('Unable to remove funnel stage.')
    }
  }

  const maxValue = useMemo(() => {
    if (stages.length === 0) return 1
    return Math.max(...stages.map((stage) => stage.conversion_percentage || 0), 1)
  }, [stages])

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Funnel Builder</h1>
        <p className="reveal">Build your funnel stage by stage with saved data.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Funnel Stages</h2>
        {error && <div className="form-error">{error}</div>}
        {stages.length > 0 ? (
          <div className="funnel-list">
            {stages.map((stage) => (
              <div key={stage.id} className="funnel-stage">
                <div className="funnel-stage-meta">
                  <strong>{stage.stage_name}</strong>
                  <span>{stage.conversion_percentage}% conversion</span>
                </div>
                <div className="funnel-bar">
                  <div
                    className="funnel-fill"
                    style={{ width: `${(stage.conversion_percentage / maxValue) * 100}%` }}
                  />
                </div>
                <div className="funnel-description">{stage.description || 'No description provided.'}</div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => handleDelete(stage.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">No funnel stages saved yet. Add your first stage below.</div>
        )}
      </section>

      <section className="section reveal">
        <h2 className="section-title">Add Funnel Stage</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="stage-name">Stage name</label>
              <input
                id="stage-name"
                type="text"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
                placeholder="e.g., Awareness"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="conversion">Conversion percentage</label>
              <input
                id="conversion"
                type="number"
                min="0"
                max="100"
                value={conversion}
                onChange={(e) => setConversion(e.target.value)}
                placeholder="e.g., 15"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="stage-description">Description</label>
            <input
              id="stage-description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short stage description"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Stage</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default FunnelBuilder
