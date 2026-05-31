import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ToolCard from '../components/ToolCard'
import MetricCard from '../components/MetricCard'
import { blueprints, metrics, techStack, assets, funnels, guardrails } from '../lib/api.js'

function Dashboard() {
  const [counts, setCounts] = useState({
    blueprints: 0,
    metrics: 0,
    tech: 0,
    assets: 0,
    funnel: 0,
    guardrails: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadCounts = async () => {
      setLoading(true)
      setError(null)
      try {
        const [blueprintResult, metricsResult, techResult, assetsResult, funnelResult, guardrailsResult] = await Promise.all([
          blueprints.list(),
          metrics.list(),
          techStack.list(),
          assets.list(),
          funnels.list(),
          guardrails.list(),
        ])

        setCounts({
          blueprints: blueprintResult.data.length,
          metrics: metricsResult.data.length,
          tech: techResult.data.length,
          assets: assetsResult.data.length,
          funnel: funnelResult.data.length,
          guardrails: guardrailsResult.data.length,
        })
      } catch (error) {
        setError(error.message || 'Failed to load data')
        setCounts({
          blueprints: 0,
          metrics: 0,
          tech: 0,
          assets: 0,
          funnel: 0,
          guardrails: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    loadCounts()
  }, [])

  const hasData = Object.values(counts).some((value) => value > 0)

  const tools = [
    { icon: '📋', title: 'Blueprints', description: 'Saved business blueprints', count: counts.blueprints, status: counts.blueprints > 0 ? 'active' : 'draft', to: '/create' },
    { icon: '📊', title: 'Metrics', description: 'Saved KPI records', count: counts.metrics, status: counts.metrics > 0 ? 'active' : 'draft', to: '/metrics' },
    { icon: '🛠️', title: 'Tech Stack', description: 'Saved tools and services', count: counts.tech, status: counts.tech > 0 ? 'active' : 'draft', to: '/tech' },
    { icon: '📦', title: 'Assets', description: 'Saved brand assets', count: counts.assets, status: counts.assets > 0 ? 'active' : 'draft', to: '/assets' },
    { icon: '🔀', title: 'Funnels', description: 'Saved funnel stages', count: counts.funnel, status: counts.funnel > 0 ? 'active' : 'draft', to: '/funnel' },
    { icon: '🛡️', title: 'Guardrails', description: 'Saved rules and standards', count: counts.guardrails, status: counts.guardrails > 0 ? 'active' : 'draft', to: '/guardrails' },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Dashboard</h1>
        <p className="reveal">Welcome back. This is your BlueprintOS control center.</p>
      </section>

      {loading ? (
        <section className="section reveal">
          <div className="empty-state">Loading…</div>
        </section>
      ) : error ? (
        <section className="section reveal">
          <div className="empty-state error">Error: {error}</div>
        </section>
      ) : hasData ? (
        <>
          <section className="section reveal">
            <h2 className="section-title">Quick Totals</h2>
            <div className="metrics-grid">
              <MetricCard label="Blueprints" value={counts.blueprints} />
              <MetricCard label="Metrics" value={counts.metrics} />
              <MetricCard label="Tech Items" value={counts.tech} />
              <MetricCard label="Assets" value={counts.assets} />
            </div>
          </section>

          <section className="section reveal">
            <h2 className="section-title">Your Tools</h2>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <Link key={index} to={tool.to} className="tool-link">
                  <ToolCard
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    count={tool.count}
                    status={tool.status}
                  />
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="section reveal">
          <div className="empty-state">
            <h3>No blueprint yet.</h3>
            <p>Create your first blueprint.</p>
            <div className="empty-actions">
              <Link to="/create" className="btn">Create Blueprint</Link>
            </div>
            <h4 style={{marginTop:16}}>Tools</h4>
            <div className="tools-grid">
              {tools.map((tool, index) => (
                <Link key={index} to={tool.to} className="tool-link">
                  <ToolCard
                    icon={tool.icon}
                    title={tool.title}
                    description={tool.description}
                    count={tool.count}
                    status={tool.status}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default Dashboard
