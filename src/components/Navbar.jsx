import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            Blueprint<span>OS</span>
          </div>
        </Link>

        <div className="nav-menu">
          <Link to="/" className={`nav-item ${isActive('/')}`}>
            Landing
          </Link>
          <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>
            Dashboard
          </Link>
          <Link to="/create" className={`nav-item ${isActive('/create')}`}>
            Create
          </Link>
          <Link to="/canvas" className={`nav-item ${isActive('/canvas')}`}>
            Canvas
          </Link>
          <Link to="/metrics" className={`nav-item ${isActive('/metrics')}`}>
            Metrics
          </Link>
          <Link to="/tech-stack" className={`nav-item ${isActive('/tech-stack')}`}>
            Tech
          </Link>
          <Link to="/assets" className={`nav-item ${isActive('/assets')}`}>
            Assets
          </Link>
          <Link to="/funnel" className={`nav-item ${isActive('/funnel')}`}>
            Funnel
          </Link>
          <Link to="/guardrails" className={`nav-item ${isActive('/guardrails')}`}>
            Guards
          </Link>
          <Link to="/ai" className={`nav-item ${isActive('/ai')}`}>
            AI
          </Link>
          <Link to="/pricing" className={`nav-item ${isActive('/pricing')}`}>
            Pricing
          </Link>
        </div>

        <a className="nav-cta" href="#contact">
          Start trial
        </a>
      </div>
    </nav>
  )
}

export default Navbar
