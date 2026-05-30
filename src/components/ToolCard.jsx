import './ToolCard.css'

function ToolCard({ icon, title, description, count = null, status = null }) {
  return (
    <div className="tool-card">
      <div className="tool-header">
        <div className="tool-icon">{icon}</div>
        {count !== null && count !== undefined && <div className="tool-count">{count}</div>}
      </div>
      <h3 className="tool-title">{title}</h3>
      <p className="tool-description">{description}</p>
      {status && <div className={`tool-status ${status}`}>{status}</div>}
    </div>
  )
}

export default ToolCard
