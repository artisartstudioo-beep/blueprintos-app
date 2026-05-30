function DataCard({ title, subtitle, children }) {
  return (
    <div className="data-card">
      <div className="data-card-header">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="data-card-body">{children}</div>
    </div>
  )
}

export default DataCard
