function CreateBlueprint() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Blueprint created (mock data)')
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Create Blueprint</h1>
        <p className="reveal">Start a new product blueprint for your team.</p>
      </section>

      <section className="section reveal">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="title">Blueprint Name</label>
            <input
              id="title"
              type="text"
              placeholder="Enter blueprint name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your product blueprint"
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="team">Team Lead</label>
              <input
                id="team"
                type="text"
                placeholder="Team lead name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Launch Deadline</label>
              <input
                id="deadline"
                type="date"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              id="tags"
              type="text"
              placeholder="e.g., feature, mobile, urgent"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Create Blueprint
            </button>
            <button type="button" className="btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateBlueprint
