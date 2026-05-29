import ToolCard from '../components/ToolCard'

function FunnelBuilder() {
  const stages = [
    { icon: '👁️', title: 'Awareness', description: 'Marketing reach and impressions', count: 125000, status: 'active' },
    { icon: '🎯', title: 'Interest', description: 'Engagement and CTR tracking', count: 8500, status: 'active' },
    { icon: '🛍️', title: 'Consideration', description: 'Product demos and trials', count: 1240, status: 'active' },
    { icon: '💳', title: 'Conversion', description: 'Purchase and signup data', count: 340, status: 'active' },
    { icon: '⭐', title: 'Retention', description: 'Active usage and churn', count: 298, status: 'active' },
    { icon: '🚀', title: 'Advocacy', description: 'Referrals and upsells', count: 67, status: 'pending' },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Funnel Builder</h1>
        <p className="reveal">Design and analyze your user conversion funnels.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Sales Funnel</h2>
        <div className="tools-grid">
          {stages.map((stage, index) => (
            <ToolCard
              key={index}
              icon={stage.icon}
              title={stage.title}
              description={stage.description}
              count={stage.count}
              status={stage.status}
            />
          ))}
        </div>
      </section>

      <section className="section reveal">
        <div className="chart-placeholder">
          <p>📈 Funnel visualization and conversion rates coming soon...</p>
        </div>
      </section>
    </main>
  )
}

export default FunnelBuilder
