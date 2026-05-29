import CanvasCard from '../components/CanvasCard'

function Canvas() {
  const canvasModel = [
    {
      title: 'Key Partners',
      items: [
        { label: 'Marketing', value: 'OKR aligned' },
        { label: 'Engineering', value: 'API ready' },
        { label: 'Design', value: 'Specs done' },
      ],
    },
    {
      title: 'Key Activities',
      items: [
        { label: 'Design', value: '40%' },
        { label: 'Development', value: '60%' },
        { label: 'Testing', value: '20%' },
      ],
    },
    {
      title: 'Key Resources',
      items: [
        { label: 'Team', value: '8 people' },
        { label: 'Budget', value: '50k' },
        { label: 'Tools', value: '12 services' },
      ],
    },
    {
      title: 'Value Proposition',
      items: [
        { label: 'Speed', value: '3x faster' },
        { label: 'Quality', value: '99.9% uptime' },
        { label: 'Cost', value: '40% savings' },
      ],
    },
    {
      title: 'Customer Segments',
      items: [
        { label: 'Enterprise', value: '60%' },
        { label: 'Mid-market', value: '30%' },
        { label: 'Startup', value: '10%' },
      ],
    },
    {
      title: 'Customer Channels',
      items: [
        { label: 'Direct sales', value: 'Active' },
        { label: 'Self-serve', value: 'Beta' },
        { label: 'Partnerships', value: 'Planned' },
      ],
    },
    {
      title: 'Customer Relationships',
      items: [
        { label: 'Support', value: '24/7' },
        { label: 'Success team', value: 'Dedicated' },
        { label: 'Community', value: 'Growing' },
      ],
    },
    {
      title: 'Revenue Streams',
      items: [
        { label: 'Subscriptions', value: '70%' },
        { label: 'Services', value: '20%' },
        { label: 'Licensing', value: '10%' },
      ],
    },
    {
      title: 'Cost Structure',
      items: [
        { label: 'Personnel', value: '50%' },
        { label: 'Infrastructure', value: '30%' },
        { label: 'Marketing', value: '20%' },
      ],
    },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Business Canvas</h1>
        <p className="reveal">Define your business model with the Business Model Canvas.</p>
      </section>

      <section className="section reveal">
        <div className="canvas-grid">
          {canvasModel.map((section, index) => (
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

export default Canvas
