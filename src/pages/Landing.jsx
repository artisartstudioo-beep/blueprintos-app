import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    reveals.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <section className="hero reveal">
        <div className="hero-tag">Business Operating System</div>
        <h1>
          Your entire business.<br />
          <em>One clear page.</em>
        </h1>
        <p className="hero-sub">
          Stop bouncing between 12 tools. BlueprintOS gives founders a single visual canvas for departments, funnels, metrics, assets, and automations.
        </p>

        <div className="hero-actions">
          <Link to="/create" className="btn-primary">
            Build Your Blueprint →
          </Link>
          <a className="btn-ghost" href="#pricing">
            See a demo
          </a>
        </div>

        <div className="hero-canvas">
          <div className="canvas-inner">
            <div className="c-block span2">
              <div className="c-label">Business Overview</div>
              <div style={{ fontSize: '11px', color: 'rgba(244,241,235,0.5)', fontFamily: 'DM Mono, monospace', lineHeight: 1.6 }}>
                Consulting Agency · B2B
              </div>
              <div className="c-dots" style={{ marginTop: '10px' }}>
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot" />
                <span className="c-dot" />
              </div>
            </div>
            <div className="c-block accent">
              <div className="c-label">Revenue</div>
              <div className="c-metric">—</div>
              <div className="c-sub">Monthly revenue</div>
              <div className="c-bar gold" style={{ marginTop: '8px' }}>
                <div className="c-bar-fill" style={{ width: '76%' }} />
              </div>
            </div>
            <div className="c-block">
              <div className="c-label">Marketing</div>
              <div style={{ fontSize: '9px', fontFamily: 'DM Mono, monospace', color: 'rgba(244,241,235,0.4)', lineHeight: 1.8 }}>
                SEO / LinkedIn / Email<br />
                Leads: 142/mo<br />
                CAC: $84
              </div>
            </div>
            <div className="c-block">
              <div className="c-label">Funnel</div>
              <div className="c-funnel">
                <div className="c-funnel-step" style={{ width: '100%' }} />
                <div className="c-funnel-step" style={{ width: '72%' }} />
                <div className="c-funnel-step" style={{ width: '48%' }} />
                <div className="c-funnel-step" style={{ width: '24%' }} />
              </div>
            </div>
            <div className="c-block accent">
              <div className="c-label">Tech Stack</div>
              <div className="c-dots">
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot on" />
                <span className="c-dot" />
                <span className="c-dot" />
              </div>
              <div style={{ fontSize: '8px', fontFamily: 'DM Mono, monospace', color: 'rgba(244,241,235,0.3)', marginTop: '6px' }}>
                6 tools active
              </div>
            </div>
            <div className="c-block span2">
              <div className="c-label">Sales Pipeline</div>
              <div className="c-bar"><div className="c-bar-fill" style={{ width: '90%' }} /></div>
              <div className="c-bar"><div className="c-bar-fill" style={{ width: '55%' }} /></div>
              <div className="c-bar gold"><div className="c-bar-fill" style={{ width: '30%' }} /></div>
            </div>
            <div className="c-block">
              <div className="c-label">AI</div>
              <div style={{ fontSize: '8px', fontFamily: 'DM Mono, monospace', color: 'var(--accent2)', lineHeight: 1.8 }}>
                ✦ Generating<br />
                content pillars...
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker-wrap reveal">
        <div className="ticker">
          <div className="ticker-item">Business Operating System</div>
          <div className="ticker-item">Funnel Builder</div>
          <div className="ticker-item">Metrics Dashboard</div>
          <div className="ticker-item">Asset Library</div>
          <div className="ticker-item">Guardrails</div>
          <div className="ticker-item">AI Generator</div>
          <div className="ticker-item">Business Operating System</div>
          <div className="ticker-item">Funnel Builder</div>
          <div className="ticker-item">Metrics Dashboard</div>
          <div className="ticker-item">Asset Library</div>
          <div className="ticker-item">Guardrails</div>
          <div className="ticker-item">AI Generator</div>
        </div>
      </div>

      <section className="stats-strip reveal">
        <div className="stat-item">
          <div className="stat-num">—</div>
          <div className="stat-label">Business Departments</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">—</div>
          <div className="stat-label">Core Metrics Tracked</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">—</div>
          <div className="stat-label">To First Blueprint</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">—</div>
          <div className="stat-label">Page. Zero Chaos.</div>
        </div>
      </section>

      <section className="section" id="problem">
        <div className="reveal">
          <div className="section-tag">The Problem</div>
          <h2 className="section-title">
            Your business lives in <em>too many places.</em>
          </h2>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '13px', color: 'rgba(244,241,235,0.45)', maxWidth: '560px', lineHeight: 1.9 }}>
            Strategy in Notion. Metrics in Sheets. CRM in HubSpot. Email in ConvertKit. Automation in Zapier. Scheduling in Calendly. Payments in Stripe. Content in Canva. AI in ChatGPT. You can't run a business you can't see in one place.
          </p>
        </div>
        <div style={{ marginTop: '32px', fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(244,241,235,0.25)' }}>
          All scattered across these tools ↓
        </div>
        <div className="chaos-grid reveal" style={{ transitionDelay: '0.15s' }}>
          {[
            { icon: '🌐', label: 'WordPress' },
            { icon: '⬡', label: 'Webflow' },
            { icon: '🛍', label: 'Shopify' },
            { icon: '📈', label: 'HubSpot' },
            { icon: '☁️', label: 'Salesforce' },
            { icon: '📧', label: 'ActiveCampaign' },
            { icon: '✉️', label: 'Mailchimp' },
            { icon: '📨', label: 'ConvertKit' },
            { icon: '💳', label: 'Stripe' },
            { icon: '🧾', label: 'ThriveCart' },
            { icon: '📊', label: 'Google Analytics' },
            { icon: '🔍', label: 'Hotjar' },
            { icon: '📅', label: 'Calendly' },
            { icon: '🗓', label: 'Acuity' },
            { icon: '🔁', label: 'Zapier' },
            { icon: '⚙️', label: 'Make' },
            { icon: '🤖', label: 'ChatGPT' },
            { icon: '✦', label: 'Claude' },
            { icon: '🖼', label: 'Midjourney' },
            { icon: '🎬', label: 'CapCut' },
            { icon: '🎨', label: 'Canva' },
            { icon: '📱', label: 'Buffer' },
            { icon: '📋', label: 'Notion' },
            { icon: '🗂', label: 'Airtable' },
            { icon: '📂', label: 'Google Drive' },
            { icon: '📊', label: 'Google Sheets' },
            { icon: '💬', label: 'Slack' },
            { icon: '📹', label: 'Loom' },
            { icon: '📝', label: 'Google Docs' },
            { icon: '🔗', label: 'ClickFunnels' },
          ].map((tool) => (
            <div key={tool.label} className="chaos-tool">
              <span className="tool-icon">{tool.icon}</span>
              {tool.label}
              <span className="chaos-arrow">↗</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="how" style={{ background: 'rgba(15,45,94,0.1)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="section-tag">The Solution</div>
        <h2 className="section-title reveal">
          One canvas.<br />
          <em>Everything visible.</em>
        </h2>
        <div className="solution-layout">
          <div className="solution-points reveal">
            {[
              { number: '01', title: 'Answer the intake form', description: 'Tell BlueprintOS about your business in 5 minutes. Name, offer, audience, tools, goals, bottlenecks.' },
              { number: '02', title: 'Your canvas is generated', description: 'A full one-page business map is built instantly — departments, funnel, metrics, tech stack, and assets.' },
              { number: '03', title: 'Customize every section', description: 'Edit cards, add rules, fill in your numbers, drop in your SOPs. Make it exactly yours.' },
              { number: '04', title: 'Let AI fill the gaps', description: 'Missing a content strategy? No sales script? Use the AI generator to build what’s missing in seconds.' },
            ].map((step) => (
              <div key={step.number} className="sol-point">
                <div className="sol-num">{step.number}</div>
                <div className="sol-text">
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="big-canvas reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="bc-cell span2" data-label="Business Overview">
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: 'rgba(244,241,235,0.5)' }}>
                  Agency · B2B · 3 Offers
                </span>
              </div>
              <div className="bc-bar-mini"><div className="bc-bar-fill" style={{ width: '82%' }} /></div>
            </div>
            <div className="bc-cell yellow" data-label="Revenue MRR">
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px' }}>—</span>
            </div>
            <div className="bc-cell" data-label="Marketing">
              <div className="bc-tag-row">
                <span className="bc-tag">SEO</span>
                <span className="bc-tag">LinkedIn</span>
                <span className="bc-tag">Email</span>
              </div>
            </div>
            <div className="bc-cell" data-label="Sales">
              <div className="bc-bar-mini"><div className="bc-bar-fill" style={{ width: '68%' }} /></div>
              <div className="bc-bar-mini"><div className="bc-bar-fill gold" style={{ width: '42%' }} /></div>
            </div>
            <div className="bc-cell" data-label="Funnel Stages">
              <div className="bc-tag-row">
                <span className="bc-tag">Lead</span>
                <span className="bc-tag">Nurture</span>
                <span className="bc-tag">Close</span>
              </div>
            </div>
            <div className="bc-cell yellow" data-label="Tech Stack">
              <div className="bc-tag-row">
                <span className="bc-tag gold">CRM</span>
                <span className="bc-tag gold">Email</span>
                <span className="bc-tag gold">AI</span>
              </div>
            </div>
            <div className="bc-cell span2" data-label="Assets & SOPs">
              <div className="bc-tag-row">
                <span className="bc-tag">Sales Page</span>
                <span className="bc-tag">Lead Magnet</span>
                <span className="bc-tag">Scripts</span>
                <span className="bc-tag">Case Studies</span>
              </div>
            </div>
            <div className="bc-cell" data-label="AI Audit">
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '8px', color: 'var(--accent2)' }}>✦ 3 gaps found</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-tag">What's Inside</div>
        <h2 className="section-title reveal">Every piece of your<br /><em>business, mapped.</em></h2>
        <div className="features-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {[
            { number: '01', icon: '🗺', title: 'Business Canvas', description: 'A scrollable, one-page map of your entire operation. Departments, funnels, metrics, and narrative — all in one view.' },
            { number: '02', icon: '⬇️', title: 'Funnel Builder', description: 'Visualize your full customer journey from traffic source to referral. See conversion points and gaps at a glance.' },
            { number: '03', icon: '🏗', title: 'Department Builder', description: 'Create cards for Marketing, Sales, Ops, Finance, Product, and more. Each with owner, tools, KPIs, and SOPs.' },
            { number: '04', icon: '🔧', title: 'Tech Stack Tracker', description: 'Log every tool powering your business. Category, cost, purpose. Know what you’re paying for and why.' },
            { number: '05', icon: '📂', title: 'Asset Library', description: 'Store links to your sales pages, lead magnets, ad creatives, email sequences, case studies, and brand kit.' },
            { number: '06', icon: '📏', title: 'Guardrails', description: 'Define your brand rules, pricing logic, sales boundaries, content filters, and AI policies. Keep the whole team aligned.' },
            { number: '07', icon: '📊', title: 'Metrics Dashboard', description: 'Track revenue, leads, CAC, LTV, conversion rates, churn, email open rates, and traffic — all in one view.' },
            { number: '08', icon: '✦', title: 'AI Generator', description: 'Generate content pillars, hook ideas, SOP drafts, sales scripts, and automation ideas on demand.' },
            { number: '09', icon: '📤', title: 'Export & Share', description: 'Export as a PDF, PNG, or shareable read-only link. Send your entire operating system to partners, investors, or clients.' },
          ].map((feature) => (
            <div key={feature.number} className="feat-card">
              <div className="feat-num">{feature.number}</div>
              <div className="feat-icon">{feature.icon}</div>
              <div className="feat-title">{feature.title}</div>
              <p className="feat-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(15,45,94,0.08)' }}>
        <div className="section-tag">Who It's For</div>
        <h2 className="section-title reveal">Built for founders who<br /><em>need clarity.</em></h2>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1px', marginTop: '60px', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.06)' }}>
          {[
            { icon: '🎙', title: 'Creators & Coaches', description: 'Map your offers, content engine, audience funnel, and delivery systems in one place.' },
            { icon: '🏢', title: 'Agencies', description: 'Audit client businesses visually. Export white-label blueprints as deliverables.' },
            { icon: '🔭', title: 'Solo Founders', description: 'See your whole business on one page. Know exactly what’s working and what’s missing.' },
            { icon: '📦', title: 'E-commerce Ops', description: 'Track your stack, ad funnels, fulfillment SOPs, and revenue KPIs in one command center.' },
          ].map((caseItem) => (
            <div key={caseItem.title} style={{ background: 'var(--ink)', padding: '32px 24px' }}>
              <div style={{ fontSize: '24px', marginBottom: '12px' }}>{caseItem.icon}</div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '15px', marginBottom: '8px' }}>{caseItem.title}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: 'rgba(244,241,235,0.4)', lineHeight: 1.7 }}>{caseItem.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="section-tag">Pricing</div>
        <h2 className="section-title reveal">Simple plans.<br /><em>No surprises.</em></h2>
        <div className="pricing-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {[
            { tier: 'Free', price: '$0', period: 'forever', features: ['1 business blueprint', 'Basic canvas sections', 'Limited AI generations', 'PNG export'], featured: false, buttonText: 'Start Free' },
            { tier: 'Pro ★ Most Popular', price: '$19', period: 'per month', features: ['Unlimited blueprints', 'Full AI generators', 'PDF + shareable export', 'Template library', 'Asset library', 'Guardrails engine'], featured: true, buttonText: 'Get Pro' },
            { tier: 'Team', price: '$49', period: 'per month', features: ['Team collaboration', 'Shared workspaces', 'Comments', 'Version history', 'Advanced exports'], featured: false, buttonText: 'Get Team' },
            { tier: 'Agency', price: '$149', period: 'per month', features: ['Client workspaces', 'White-label exports', 'Template marketplace', 'Priority support'], featured: false, buttonText: 'Get Agency' },
          ].map((plan) => (
            <div key={plan.tier} className={`price-card${plan.featured ? ' featured' : ''}`}>
              <div className="price-tier">{plan.tier}</div>
              <div className="price-amount">{plan.price}</div>
              <div className="price-period">{plan.period}</div>
              <ul className="price-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="/pricing" className="price-btn">{plan.buttonText}</a>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="reveal">Stop managing chaos.<br /><em>Build the blueprint.</em></h2>
        <p className="reveal" style={{ transitionDelay: '0.1s' }}>
          Your entire business. One visual operating system. Five minutes to get started.
        </p>
        <div className="reveal" style={{ transitionDelay: '0.2s' }}>
          <Link to="/create" className="btn-primary" style={{ fontSize: '13px', padding: '18px 40px' }}>
            Build Your Blueprint — It's Free →
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Landing
