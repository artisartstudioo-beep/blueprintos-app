(async () => {
  const base = process.env.API_BASE || 'http://localhost:5000/api'
  const name = process.env.SEED_TEST_USER_NAME || 'Dev Test'
  const email = process.env.SEED_TEST_USER_EMAIL || 'devtest+local@example.com'
  const password = process.env.SEED_TEST_USER_PASSWORD || 'Password123!'

  const headers = { 'Content-Type': 'application/json' }

  const doFetch = async (path, opts = {}) => {
    const res = await fetch(`${base}${path}`, {
      headers,
      ...opts,
    })
    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch (e) { data = { raw: text } }
    if (!res.ok) {
      const err = new Error(data.message || `HTTP ${res.status}`)
      err.status = res.status
      err.data = data
      throw err
    }
    return data
  }

  try {
    console.log('Registering user...')
    let token
    try {
      const reg = await doFetch('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) })
      token = reg.token
      console.log('Registered, token received')
    } catch (err) {
      if (err.status === 409) {
        console.log('User exists, logging in...')
        const login = await doFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
        token = login.token
        console.log('Logged in, token received')
      } else {
        throw err
      }
    }

    if (!token) throw new Error('No token obtained')
    headers['Authorization'] = `Bearer ${token}`

    console.log('\nCreating blueprint...')
    const blueprintPayload = {
      business_name: 'Acme Example',
      niche: 'Example Niche',
      main_offer: 'Example Offer',
      target_audience: 'Developers',
      main_goal: 'Grow users',
      current_tools: 'Email, Analytics',
      biggest_bottleneck: 'Acquisition'
    }
    const bp = await doFetch('/blueprints', { method: 'POST', body: JSON.stringify(blueprintPayload) })
    console.log('Blueprint created:', bp.data.id || bp.data)

    console.log('Adding metric...')
    const metric = await doFetch('/metrics', { method: 'POST', body: JSON.stringify({ metric_name: 'MAU', value: '1234', date: new Date().toISOString().split('T')[0], notes: 'initial' }) })
    console.log('Metric created:', metric.data.id)

    console.log('Adding tech tool...')
    const tech = await doFetch('/tech-stack', { method: 'POST', body: JSON.stringify({ tool_name: 'Example CRM', category: 'Marketing', monthly_cost: '49', purpose: 'Customer management', status: 'active' }) })
    console.log('Tech item created:', tech.data.id)

    console.log('Adding asset...')
    const asset = await doFetch('/assets', { method: 'POST', body: JSON.stringify({ asset_name: 'Logo', type: 'SVG', link: '', notes: 'Primary logo' }) })
    console.log('Asset created:', asset.data.id)

    console.log('Adding funnel stage...')
    const funnel = await doFetch('/funnels', { method: 'POST', body: JSON.stringify({ stage_name: 'Awareness', description: 'Top of funnel', conversion_percentage: 50 }) })
    console.log('Funnel stage created:', funnel.data.id)

    console.log('Adding guardrail...')
    const guard = await doFetch('/guardrails', { method: 'POST', body: JSON.stringify({ rule_title: 'Require tests', category: 'Quality', rule_description: 'All PRs must include tests' }) })
    console.log('Guardrail created:', guard.data.id)

    console.log('\nVerifying Dashboard counts...')
    const bps = await doFetch('/blueprints')
    const mets = await doFetch('/metrics')
    const techs = await doFetch('/tech-stack')
    const assets = await doFetch('/assets')
    const funnels = await doFetch('/funnels')
    const guards = await doFetch('/guardrails')

    console.log('Counts:', {
      blueprints: bps.data.length,
      metrics: mets.data.length,
      tech: techs.data.length,
      assets: assets.data.length,
      funnels: funnels.data.length,
      guardrails: guards.data.length,
    })

    console.log('\nDone. You can now open the app and view Dashboard/Canvas at the frontend URL.')
  } catch (err) {
    console.error('Error during seeding:', err.message || err)
    if (err.data) console.error('Details:', err.data)
    process.exit(1)
  }
})()
