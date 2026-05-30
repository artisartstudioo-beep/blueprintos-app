const safeRead = (key) => {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(key)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`Unable to parse localStorage key ${key}`, error)
    return null
  }
}

export const STORAGE_KEYS = {
  blueprints: 'blueprintos_blueprints',
  metrics: 'blueprintos_metrics',
  tech: 'blueprintos_tech_stack',
  assets: 'blueprintos_assets',
  funnel: 'blueprintos_funnel_stages',
  guardrails: 'blueprintos_guardrails',
}

export const loadStorage = (key, defaultValue = []) => {
  const value = safeRead(key)
  return Array.isArray(value) ? value : defaultValue
}

export const saveStorage = (key, value) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export const appendStorage = (key, item) => {
  const list = loadStorage(key, [])
  const next = [...list, item]
  saveStorage(key, next)
  return next
}

export const removeStorageAt = (key, index) => {
  const list = loadStorage(key, [])
  if (index < 0 || index >= list.length) return list
  const next = [...list]
  next.splice(index, 1)
  saveStorage(key, next)
  return next
}
