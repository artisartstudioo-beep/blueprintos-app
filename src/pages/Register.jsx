import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../lib/api.js'
import FormInput from '../components/FormInput.jsx'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const response = await registerUser(form)
      const token = response?.token
      if (token) {
        navigate('/dashboard')
      } else {
        setError('Registration failed. Please try again.')
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to register.')
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h2>Create an Account</h2>
        <p>Start saving your blueprints and business growth plans.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormInput
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
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
            placeholder="Create a password"
          />
          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}
          <button type="submit" className="primary-button">Register</button>
        </form>
      </div>
    </section>
  )
}

export default Register
