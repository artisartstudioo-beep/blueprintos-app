function AIGenerator() {
  const handleGenerate = (e) => {
    e.preventDefault()
    alert('AI generation triggered (placeholder)')
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">AI Generator</h1>
        <p className="reveal">Use AI to generate blueprints, copy, and strategies.</p>
      </section>

      <section className="section reveal">
        <div className="ai-container">
          <div className="ai-card">
            <h2>Generate Blueprint</h2>
            <p>Create a new product blueprint using AI assistance.</p>
            <form onSubmit={handleGenerate}>
              <textarea
                placeholder="Describe your product idea..."
                rows="4"
              />
              <button type="submit" className="btn-primary">
                Generate
              </button>
            </form>
          </div>

          <div className="ai-card">
            <h2>Generate Content</h2>
            <p>Write marketing copy, documentation, and more.</p>
            <form onSubmit={handleGenerate}>
              <input
                type="text"
                placeholder="What do you want to generate?"
              />
              <button type="submit" className="btn-primary">
                Generate
              </button>
            </form>
          </div>

          <div className="ai-card">
            <h2>Generate Strategy</h2>
            <p>Build a go-to-market strategy using AI.</p>
            <form onSubmit={handleGenerate}>
              <select>
                <option>Select product type...</option>
                <option>SaaS</option>
                <option>Mobile App</option>
                <option>Consumer App</option>
                <option>B2B Enterprise</option>
              </select>
              <button type="submit" className="btn-primary">
                Generate
              </button>
            </form>
          </div>
        </div>

        <div className="ai-status">
          <p>🚀 AI features are in development. Check back soon!</p>
        </div>
      </section>
    </main>
  )
}

export default AIGenerator
