import CanvasCard from '../components/CanvasCard'

function Guardrails() {
  const guardrails = [
    {
      title: 'Code Quality',
      items: [
        { label: 'Linting', value: 'ESLint' },
        { label: 'Formatting', value: 'Prettier' },
        { label: 'Complexity', value: '< 10' },
      ],
    },
    {
      title: 'Performance',
      items: [
        { label: 'Lighthouse Score', value: '> 90' },
        { label: 'Load Time', value: '< 2s' },
        { label: 'Bundle Size', value: '< 100kb' },
      ],
    },
    {
      title: 'Security',
      items: [
        { label: 'Dependencies', value: 'Audited' },
        { label: 'Secrets', value: 'Encrypted' },
        { label: 'SSL', value: 'Required' },
      ],
    },
    {
      title: 'Accessibility',
      items: [
        { label: 'WCAG Standard', value: 'Level AA' },
        { label: 'Contrast Ratio', value: '7:1' },
        { label: 'Keyboard Nav', value: 'Full' },
      ],
    },
    {
      title: 'Testing',
      items: [
        { label: 'Coverage', value: '> 80%' },
        { label: 'Unit Tests', value: 'Required' },
        { label: 'E2E Tests', value: 'Required' },
      ],
    },
    {
      title: 'Documentation',
      items: [
        { label: 'README', value: 'Complete' },
        { label: 'API Docs', value: 'Updated' },
        { label: 'Comments', value: 'Inline' },
      ],
    },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Guardrails</h1>
        <p className="reveal">Quality, compliance, and best practices standards.</p>
      </section>

      <section className="section reveal">
        <div className="canvas-grid">
          {guardrails.map((section, index) => (
            <CanvasCard
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Guardrails
