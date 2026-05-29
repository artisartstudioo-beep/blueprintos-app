import './CanvasCard.css'

function CanvasCard({ title, items = [] }) {
  return (
    <div className="canvas-card">
      <h3 className="canvas-title">{title}</h3>
      <div className="canvas-items">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="canvas-item">
              <span className="item-label">{item.label}</span>
              {item.value && <span className="item-value">{item.value}</span>}
            </div>
          ))
        ) : (
          <div className="canvas-empty">No items yet</div>
        )}
      </div>
    </div>
  )
}

export default CanvasCard
