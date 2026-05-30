const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TOKEN_KEY = 'blueprintos_token'
const getToken = () => window.localStorage.getItem(TOKEN_KEY)
const setToken = (token) => window.localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => window.localStorage.removeItem(TOKEN_KEY)

const handleResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || response.statusText || 'API error')
  }
  return data
}

const authHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const request = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...authHeaders(),
    ...options.headers,
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })
  return handleResponse(response)
}

export const auth = {
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  me: () => request('/auth/me', { method: 'GET' }),
  logout: () => {
    clearToken()
  },
}

export const loginUser = async (payload) => {
  const response = await auth.login(payload)
  if (response?.token) {
    setToken(response.token)
  }
  return response
}

export const registerUser = async (payload) => {
  const response = await auth.register(payload)
  if (response?.token) {
    setToken(response.token)
  }
  return response
}

export const blueprints = {
  list: () => request('/blueprints', { method: 'GET' }),
  create: (payload) => request('/blueprints', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/blueprints/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/blueprints/${id}`, { method: 'DELETE' }),
}

export const metrics = {
  list: () => request('/metrics', { method: 'GET' }),
  create: (payload) => request('/metrics', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/metrics/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/metrics/${id}`, { method: 'DELETE' }),
}

export const techStack = {
  list: () => request('/tech-stack', { method: 'GET' }),
  create: (payload) => request('/tech-stack', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/tech-stack/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/tech-stack/${id}`, { method: 'DELETE' }),
}

export const assets = {
  list: () => request('/assets', { method: 'GET' }),
  create: (payload) => request('/assets', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/assets/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/assets/${id}`, { method: 'DELETE' }),
}

export const funnels = {
  list: () => request('/funnels', { method: 'GET' }),
  create: (payload) => request('/funnels', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/funnels/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/funnels/${id}`, { method: 'DELETE' }),
}

export const guardrails = {
  list: () => request('/guardrails', { method: 'GET' }),
  create: (payload) => request('/guardrails', { method: 'POST', body: payload }),
  update: (id, payload) => request(`/guardrails/${id}`, { method: 'PUT', body: payload }),
  remove: (id) => request(`/guardrails/${id}`, { method: 'DELETE' }),
}

export const exportsApi = {
  blueprint: (id) => request(`/exports/blueprint/${id}`, { method: 'GET' }),
}

export const authToken = {
  getToken,
  setToken,
  clearToken,
}
