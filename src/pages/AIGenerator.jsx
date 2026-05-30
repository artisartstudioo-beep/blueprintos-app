function AIGenerator() {
  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">AI Generator</h1>
        <p className="reveal">AI generation is not connected yet. Add an API key later.</p>
      </section>

      <section className="section reveal">
        <div className="ai-container">
          <div className="ai-card">
            <h2>Generate Blueprint</h2>
            <p>This tool will draft blueprints from your saved data once AI is connected.</p>
            <textarea disabled value="AI Generator is not connected yet. Add an API key later." rows="4" />
            <button type="button" className="btn-primary" disabled>
              Generate
            </button>
          </div>

          <div className="ai-card">
            <h2>Generate Content</h2>
            <p>Copy and strategy drafts will appear once a real AI API is configured.</p>
            <input disabled value="API key required" />
            <button type="button" className="btn-primary" disabled>
              Generate
            </button>
          </div>

          <div className="ai-card">
            <h2>Generate Strategy</h2>
            <p>Strategy generation will use your saved funnel, metrics, and blueprint.</p>
            <select disabled>
              <option>Not connected yet</option>
            </select>
            <button type="button" className="btn-primary" disabled>
              Generate
            </button>
          </div>
        </div>

        <div className="ai-status">
          <p>AI Generator is not connected yet. Add an API key later.</p>
        </div>
      </section>
    </main>
  )
}

export default AIGenerator
