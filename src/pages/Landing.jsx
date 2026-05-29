import { useEffect } from 'react'

function Landing() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    reveals.forEach((element, index) => {
      window.setTimeout(() => {
        element.classList.add('visible')
      }, index * 110)
    })
  }, [])

  return (
    <main>
      <section className="hero reveal">
        <div className="hero-tag">BlueprintOS · launch control</div>
        <h1>
          Build digital products with <em>precision</em> and speed.
        </h1>
        <p className="hero-sub">
          A modern product operating system for teams that need clean
          collaboration, live insights, and aligned launch workflows.
        </p>

        <div className="hero-actions">
          <a className="btn-primary" href="#pricing">
            Explore plans
          </a>
          <a className="btn-ghost" href="#insights">
            View insights
          </a>
        </div>

        <div className="hero-canvas">
          <div className="canvas-inner">
            <div className="c-block span2 accent reveal">
              <div className="c-label">Live pipeline</div>
              <div className="c-metric">72%</div>
              <div className="c-sub">Approval velocity</div>
              <div className="c-bar gold">
                <div className="c-bar-fill" style={{ width: '72%' }} />
              </div>
            </div>
            <div className="c-block reveal">
              <div className="c-label">AI signals</div>
              <div className="c-dots">
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot" />
                <span className="c-dot" />
                <span className="c-dot" />
              </div>
            </div>
            <div className="c-block reveal">
              <div className="c-label">Team load</div>
              <div className="c-bar">
                <div className="c-bar-fill" style={{ width: '48%' }} />
              </div>
              <div className="c-sub">Capacity index</div>
            </div>
            <div className="c-block reveal">
              <div className="c-label">Launch score</div>
              <div className="c-metric">8.4</div>
              <div className="c-sub">Predictive readiness</div>
            </div>
            <div className="c-block span3 accent reveal">
              <div className="c-label">Workflow funnel</div>
              <div className="c-funnel">
                <div className="c-funnel-step" style={{ width: '88%' }} />
                <div className="c-funnel-step" style={{ width: '66%' }} />
                <div className="c-funnel-step" style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ticker-wrap reveal">
        <div className="ticker">
          <div className="ticker-item">Realtime analytics live</div>
          <div className="ticker-item">AI-assisted workflow blueprints</div>
          <div className="ticker-item">Product launch confidence +24%</div>
          <div className="ticker-item">Cross-team alignment in one view</div>
          <div className="ticker-item">Realtime analytics live</div>
          <div className="ticker-item">AI-assisted workflow blueprints</div>
        </div>
      </section>

      <section className="stats-strip reveal">
        <div className="stat-item">
          <div className="stat-num">12x</div>
          <div className="stat-label">Faster decision loops</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">94%</div>
          <div className="stat-label">On-time launches</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">4.8</div>
          <div className="stat-label">Team satisfaction</div>
        </div>
      </section>

      <section className="cta-section reveal">
        <h2>
          Launch with clarity and <em>confidence</em>.
        </h2>
        <p>
          BlueprintOS is built for product teams that want faster launches without the noise.
        </p>
        <a className="btn-primary" href="#pricing">
          Schedule a demo
        </a>
      </section>
    </main>
  )
}

export default Landing
