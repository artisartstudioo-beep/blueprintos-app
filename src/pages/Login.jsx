import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../lib/api.js'
import FormInput from '../components/FormInput.jsx'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const response = await loginUser(form)
      const token = response?.token
      if (token) {
        navigate('/dashboard')
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to login.')
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Login</h2>
        <p>Access your BlueprintOS workspace.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="primary-button">Login</button>
        </form>
      </div>
    </section>
  )
}

export default Login
