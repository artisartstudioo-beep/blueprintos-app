import './MetricCard.css'

function MetricCard({ label, value, date, notes, unit = '' }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">
        {value}
        {unit && <span className="metric-unit">{unit}</span>}
      </div>
      {date && <div className="metric-detail">Date: {date}</div>}
      {notes && <div className="metric-detail">Notes: {notes}</div>}
    </div>
  )
}

export default MetricCard
