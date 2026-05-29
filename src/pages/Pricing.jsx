function Pricing() {
  return (
    <main className="page-content">
      <section className="page-hero">
        <h1 className="reveal">Pricing</h1>
        <p className="reveal">Choose the plan that fits your launch team.</p>
      </section>

      <section className="section reveal">
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-tier">Starter</div>
            <div className="price-amount">$29</div>
            <div className="price-period">per user / month</div>
            <ul className="price-features">
              <li>Core launch boards</li>
              <li>Live task tracking</li>
              <li>Email notifications</li>
            </ul>
            <button className="price-btn">Choose Starter</button>
          </div>
          <div className="price-card featured">
            <div className="price-tier">Growth</div>
            <div className="price-amount">$79</div>
            <div className="price-period">per user / month</div>
            <ul className="price-features">
              <li>Everything in Starter</li>
              <li>Advanced analytics</li>
              <li>Priority support</li>
            </ul>
            <button className="price-btn">Get Growth</button>
          </div>
          <div className="price-card">
            <div className="price-tier">Scale</div>
            <div className="price-amount">$149</div>
            <div className="price-period">per user / month</div>
            <ul className="price-features">
              <li>Automated workflows</li>
              <li>Governance controls</li>
              <li>Custom integrations</li>
            </ul>
            <button className="price-btn">Choose Scale</button>
          </div>
          <div className="price-card">
            <div className="price-tier">Enterprise</div>
            <div className="price-amount">Custom</div>
            <div className="price-period">tailored for teams</div>
            <ul className="price-features">
              <li>Dedicated success lead</li>
              <li>Security review</li>
              <li>Unlimited templates</li>
            </ul>
            <button className="price-btn">Talk to Sales</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Pricing
