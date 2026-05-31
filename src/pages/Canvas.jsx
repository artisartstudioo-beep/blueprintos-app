import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CanvasCard from '../components/CanvasCard'
import { blueprints, assets as assetsApi, techStack, metrics, funnels, guardrails } from '../lib/api.js'

function Canvas() {
  const [blueprintItems, setBlueprints] = useState([])
  const [assets, setAssets] = useState([])
  const [tech, setTech] = useState([])
  const [metricsData, setMetricsData] = useState([])
  const [funnel, setFunnel] = useState([])
  const [guardrailsData, setGuardrailsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCanvasData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [blueprintResponse, assetResponse, techResponse, metricsResponse, funnelResponse, guardrailsResponse] = await Promise.all([
          blueprints.list(),
          assetsApi.list(),
          techStack.list(),
          metrics.list(),
          funnels.list(),
          guardrails.list(),
        ])

        setBlueprints(blueprintResponse.data)
        setAssets(assetResponse.data)
        setTech(techResponse.data)
        setMetricsData(metricsResponse.data)
        setFunnel(funnelResponse.data)
        setGuardrailsData(guardrailsResponse.data)
      } catch (err) {
        setError(err.message || 'Failed to load canvas data')
        setBlueprints([])
        setAssets([])
        setTech([])
        setMetricsData([])
        setFunnel([])
        setGuardrailsData([])
      } finally {
        setLoading(false)
      }
    }

    loadCanvasData()
  }, [])

  const blueprint = blueprintItems.length > 0 ? blueprintItems[0] : null

  const canvasModel = [
    {
      title: 'Overview',
      items: blueprint
        ? [
            { label: 'Business name', value: blueprint.business_name },
            { label: 'Niche', value: blueprint.niche },
            { label: 'Main offer', value: blueprint.main_offer },
            { label: 'Target audience', value: blueprint.target_audience },
          ]
        : [{ label: 'No blueprint yet', value: 'Create your first blueprint on the Create page.' }],
    },
    {
      title: 'Marketing',
      items: blueprint
        ? [
            { label: 'Main goal', value: blueprint.main_goal },
            { label: 'Biggest bottleneck', value: blueprint.biggest_bottleneck || 'No bottleneck noted' },
            { label: 'Current tools', value: blueprint.current_tools || 'No tools listed yet' },
          ]
        : [{ label: 'No blueprint yet', value: 'Create your first blueprint on the Create page.' }],
    },
    {
      title: 'Sales',
      items: blueprint
        ? [
            { label: 'Offer', value: blueprint.main_offer },
            { label: 'Audience focus', value: blueprint.target_audience },
            { label: 'Goal', value: blueprint.main_goal },
          ]
        : [{ label: 'No sales plan yet', value: 'Add a blueprint to populate sales details.' }],
    },
    {
      title: 'Operations',
      items: blueprint
        ? [
            { label: 'Tools in use', value: blueprint.current_tools || 'No tools listed yet' },
            { label: 'Main bottleneck', value: blueprint.biggest_bottleneck || 'No bottleneck noted' },
          ]
        : [{ label: 'No operations data', value: 'Add your blueprint to begin.' }],
    },
    {
      title: 'Finance',
      items: blueprint
        ? [{ label: 'Financial focus', value: blueprint.main_goal || 'No financial goal set yet' }]
        : [{ label: 'No finance details', value: 'Blueprint data will appear here.' }],
    },
    {
      title: 'Tech Stack',
      items:
        tech.length > 0
          ? tech.map((item) => ({ label: item.tool_name, value: `${item.category} • $${item.monthly_cost}` }))
          : [{ label: 'No tech tools added yet', value: 'Use the Tech Stack page to add your tools.' }],
    },
    {
      title: 'Assets',
      items:
        assets.length > 0
          ? assets.map((asset) => ({ label: asset.asset_name, value: `${asset.type}${asset.link ? ` • ${asset.link}` : ''}` }))
          : [{ label: 'No assets added yet', value: 'Use the Asset Library page to save assets.' }],
    },
    {
      title: 'Metrics',
      items:
        metricsData.length > 0
          ? metricsData.map((metric) => ({ label: metric.metric_name, value: `${metric.value} (${metric.date})` }))
          : [{ label: 'No metrics added yet', value: 'Use the Metrics page to track KPIs.' }],
    },
    {
      title: 'Guardrails',
      items:
        guardrailsData.length > 0
          ? guardrailsData.map((item) => ({ label: item.rule_title, value: item.rule_description }))
          : [{ label: 'No guardrails defined yet', value: 'Use the Guardrails page to add rules.' }],
    },
  ]

  if (loading) {
    return (
      <main className="page-content">
        <section className="page-hero">
          <h1 className="reveal">Business Canvas</h1>
          <p className="reveal">See your saved blueprint data in one canvas view.</p>
        </section>
        <section className="section reveal">
          <div className="empty-state">Loading…</div>
        </section>
      </main>
    )
  }

  if (error) {
    return (
      <main className="page-content">
        <section className="page-hero">
          <h1 className="reveal">Business Canvas</h1>
          <p className="reveal">See your saved blueprint data in one canvas view.</p>
        </section>
        <section className="section reveal">
          <div className="empty-state error">Error: {error}
            <div style={{marginTop:12}}>
              {error.toLowerCase().includes('unauthorized') || error.toLowerCase().includes('login') ? (
                <>
                  <Link to="/login" className="btn" style={{marginRight:8}}>Login</Link>
                  <Link to="/register" className="btn-ghost">Register</Link>
                </>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    )
  }

  // If there is no blueprint, show an explicit empty canvas state
  if (!blueprint) {
    return (
      <main className="page-content">
        <section className="page-hero">
          <h1 className="reveal">Business Canvas</h1>
          <p className="reveal">See your saved blueprint data in one canvas view.</p>
        </section>
        <section className="section reveal">
          <div className="empty-state">
            <h3>No canvas yet.</h3>
            <p>Create a blueprint first.</p>
            <div className="empty-actions">
              <Link to="/create" className="btn">Create Blueprint</Link>
            </div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Business Canvas</h1>
        <p className="reveal">See your saved blueprint data in one canvas view.</p>
      </section>

      <section className="section reveal">
        <div className="canvas-grid">
          {canvasModel.map((section, index) => (
            <CanvasCard key={index} title={section.title} items={section.items} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Canvas
