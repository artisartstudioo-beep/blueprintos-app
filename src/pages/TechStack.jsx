import ToolCard from '../components/ToolCard'

function TechStack() {
  const techItems = [
    { icon: '⚛️', title: 'Frontend', description: 'React 19 + Vite', status: 'active' },
    { icon: '🟢', title: 'Runtime', description: 'Node.js 20+', status: 'active' },
    { icon: '🗄️', title: 'Database', description: 'PostgreSQL 15', status: 'active' },
    { icon: '☁️', title: 'Hosting', description: 'AWS (EC2, RDS, S3)', status: 'active' },
    { icon: '🔌', title: 'APIs', description: 'REST + GraphQL', status: 'pending' },
    { icon: '📦', title: 'Package Manager', description: 'npm', status: 'active' },
    { icon: '🧪', title: 'Testing', description: 'Vitest + React Testing', status: 'active' },
    { icon: '📝', title: 'Documentation', description: 'Markdown + Docusaurus', status: 'draft' },
    { icon: '🔐', title: 'Auth', description: 'JWT + OAuth 2.0', status: 'active' },
    { icon: '📊', title: 'Analytics', description: 'Mixpanel + PostHog', status: 'pending' },
    { icon: '🚀', title: 'CI/CD', description: 'GitHub Actions', status: 'active' },
    { icon: '🔧', title: 'Dev Tools', description: 'ESLint + Prettier', status: 'active' },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Tech Stack Tracker</h1>
        <p className="reveal">Inventory and manage your technology stack.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Technologies</h2>
        <div className="tools-grid">
          {techItems.map((item, index) => (
            <ToolCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              status={item.status}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default TechStack
