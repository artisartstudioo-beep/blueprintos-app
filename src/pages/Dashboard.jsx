import ToolCard from '../components/ToolCard'
import MetricCard from '../components/MetricCard'

function Dashboard() {
  const tools = [
    { icon: '📋', title: 'Blueprints', description: 'Active product blueprints', count: 8, status: 'active' },
    { icon: '📊', title: 'Metrics', description: 'Real-time analytics', count: 24, status: 'active' },
    { icon: '🛠️', title: 'Tech Stack', description: 'Technology inventory', count: 12, status: 'active' },
    { icon: '📦', title: 'Assets', description: 'Design & brand assets', count: 45, status: 'active' },
    { icon: '🔀', title: 'Funnels', description: 'User flow analysis', count: 3, status: 'pending' },
    { icon: '🛡️', title: 'Guardrails', description: 'Quality & compliance', count: 6, status: 'draft' },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Dashboard</h1>
        <p className="reveal">Welcome back. Here's your launch control center.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Quick Stats</h2>
        <div className="metrics-grid">
          <MetricCard label="Active Projects" value="8" trend={12} />
          <MetricCard label="Team Members" value="24" trend={5} />
          <MetricCard label="Launch Score" value="8.4" unit="/10" trend={3} />
          <MetricCard label="Completion Rate" value="94" unit="%" trend={8} />
        </div>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Your Tools</h2>
        <div className="tools-grid">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              count={tool.count}
              status={tool.status}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
