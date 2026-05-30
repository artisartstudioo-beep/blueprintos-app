import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const token = window.localStorage.getItem('blueprintos_token')

  const isActive = (path) => location.pathname === path ? 'active' : ''

  const handleLogout = () => {
    window.localStorage.removeItem('blueprintos_token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <div className="logo">
            Blueprint<span>OS</span>
          </div>
        </Link>

        <div className="nav-menu">
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

        <div className="nav-actions">
          {token ? (
            <button type="button" className="nav-cta" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-item login-link">
                Login
              </Link>
              <Link to="/register" className="nav-cta">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
