import { useEffect, useState } from 'react'
import CanvasCard from '../components/CanvasCard'
import { assets as assetsApi } from '../lib/api.js'

function AssetLibrary() {
  const [assets, setAssets] = useState([])
  const [category, setCategory] = useState('Brand')
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [link, setLink] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const response = await assetsApi.list()
        setAssets(response.data)
      } catch (err) {
        setError('Unable to load assets.')
      }
    }

    loadAssets()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await assetsApi.create({
        asset_name: name.trim(),
        type: type.trim(),
        link: link.trim(),
        notes: notes.trim(),
        category: category.trim() || 'General',
      })
      setAssets((current) => [response.data, ...current])
      setCategory('Brand')
      setName('')
      setType('')
      setLink('')
      setNotes('')
    } catch (err) {
      setError('Unable to save asset.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await assetsApi.remove(id)
      setAssets((current) => current.filter((item) => item.id !== id))
    } catch (err) {
      setError('Unable to remove asset.')
    }
  }

  const groupedAssets = assets.reduce((grouped, asset) => {
    const key = asset.category || 'General'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(asset)
    return grouped
  }, {})

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Asset Library</h1>
        <p className="reveal">Centralized asset management with real user entries.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Saved Assets</h2>
        {error && <div className="form-error">{error}</div>}
        {assets.length > 0 ? (
          <div className="canvas-grid">
            {Object.keys(groupedAssets).map((categoryKey) => (
              <CanvasCard
                key={categoryKey}
                title={categoryKey}
                items={groupedAssets[categoryKey].slice(0, 4).map((asset) => ({
                  label: asset.asset_name,
                  value: asset.type,
                }))}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">No assets added yet. Add your first asset below.</div>
        )}

        {assets.length > 0 && (
          <div className="item-list">
            {assets.map((asset) => (
              <div key={asset.id} className="item-row">
                <div>
                  <strong>{asset.asset_name}</strong> · {asset.type}
                  <div className="item-meta">
                    {asset.category} • {asset.link ? <a href={asset.link} target="_blank" rel="noreferrer">Link</a> : 'No link'} • {asset.notes || 'No notes'}
                  </div>
                </div>
                <button className="delete-btn" type="button" onClick={() => handleDelete(asset.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="section reveal">
        <h2 className="section-title">Add Asset</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="asset-category">Category</label>
              <select id="asset-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option>Brand</option>
                <option>Visual</option>
                <option>Content</option>
                <option>Media</option>
                <option>General</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="asset-name">Asset Name</label>
              <input
                id="asset-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Primary logo"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="asset-type">Type</label>
              <input
                id="asset-type"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g., SVG, PNG, Video"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="asset-link">Link</label>
              <input
                id="asset-link"
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="asset-notes">Notes</label>
            <input
              id="asset-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Asset</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AssetLibrary
