import { useState } from 'react'
import { blueprints } from '../lib/api.js'

function CreateBlueprint() {
  const [businessName, setBusinessName] = useState('')
  const [niche, setNiche] = useState('')
  const [mainOffer, setMainOffer] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [mainGoal, setMainGoal] = useState('')
  const [currentTools, setCurrentTools] = useState('')
  const [biggestBottleneck, setBiggestBottleneck] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await blueprints.create({
        business_name: businessName.trim(),
        niche: niche.trim(),
        main_offer: mainOffer.trim(),
        target_audience: targetAudience.trim(),
        main_goal: mainGoal.trim(),
        current_tools: currentTools.trim(),
        biggest_bottleneck: biggestBottleneck.trim(),
      })

      setMessage('Blueprint saved successfully. It will appear on the Dashboard and Business Canvas.')
      setBusinessName('')
      setNiche('')
      setMainOffer('')
      setTargetAudience('')
      setMainGoal('')
      setCurrentTools('')
      setBiggestBottleneck('')

      setTimeout(() => {
        setMessage('')
      }, 4000)
    } catch (err) {
      setError(err.message || 'Unable to save blueprint.')
    }
  }

  const handleClear = () => {
    setBusinessName('')
    setNiche('')
    setMainOffer('')
    setTargetAudience('')
    setMainGoal('')
    setCurrentTools('')
    setBiggestBottleneck('')
    setMessage('')
    setError('')
  }

  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Create Blueprint</h1>
        <p className="reveal">Add a business blueprint and save it to your account.</p>
      </section>

      <section className="section reveal">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="businessName">Business name</label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Enter business name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="niche">Niche</label>
              <input
                id="niche"
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="Enter niche"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mainOffer">Main offer</label>
            <input
              id="mainOffer"
              type="text"
              value={mainOffer}
              onChange={(e) => setMainOffer(e.target.value)}
              placeholder="Describe the main product or service"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="targetAudience">Target audience</label>
              <input
                id="targetAudience"
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Describe the target audience"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mainGoal">Main goal</label>
              <input
                id="mainGoal"
                type="text"
                value={mainGoal}
                onChange={(e) => setMainGoal(e.target.value)}
                placeholder="Describe the main business goal"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="currentTools">Current tools</label>
            <input
              id="currentTools"
              type="text"
              value={currentTools}
              onChange={(e) => setCurrentTools(e.target.value)}
              placeholder="List current tools, separated by commas"
            />
          </div>

          <div className="form-group">
            <label htmlFor="biggestBottleneck">Biggest bottleneck</label>
            <input
              id="biggestBottleneck"
              type="text"
              value={biggestBottleneck}
              onChange={(e) => setBiggestBottleneck(e.target.value)}
              placeholder="Describe the main bottleneck"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Blueprint</button>
            <button type="button" className="btn-ghost" onClick={handleClear}>Clear</button>
          </div>

          {error && <div className="form-error">{error}</div>}
          {message && <div className="form-success">{message}</div>}
        </form>
      </section>
    </main>
  )
}

export default CreateBlueprint
