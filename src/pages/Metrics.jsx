import MetricCard from '../components/MetricCard'

function Metrics() {
  const metrics = [
    { label: 'Monthly Active Users', value: '12,400', trend: 15 },
    { label: 'Conversion Rate', value: '4.8', unit: '%', trend: 2 },
    { label: 'Avg. Session Duration', value: '6m 24s', trend: 8 },
    { label: 'Bounce Rate', value: '32', unit: '%', trend: -5 },
    { label: 'Customer Retention', value: '87', unit: '%', trend: 12 },
    { label: 'NPS Score', value: '52', trend: 6 },
    { label: 'Revenue MoM Growth', value: '22', unit: '%', trend: 18 },
    { label: 'Customer Acquisition Cost', value: '$45', trend: -3 },
  ]

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Metrics Tracker</h1>
        <p className="reveal">Monitor key performance indicators in real time.</p>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Core Metrics</h2>
        <div className="metrics-grid metrics-large">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              trend={metric.trend}
            />
          ))}
        </div>
      </section>

      <section className="section reveal">
        <h2 className="section-title">Trends</h2>
        <div className="chart-placeholder">
          <p>📊 Charts and visualizations coming soon...</p>
        </div>
      </section>
    </main>
  )
}

export default Metrics
