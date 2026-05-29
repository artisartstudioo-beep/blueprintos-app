import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import CreateBlueprint from './pages/CreateBlueprint'
import Canvas from './pages/Canvas'
import Metrics from './pages/Metrics'
import TechStack from './pages/TechStack'
import AssetLibrary from './pages/AssetLibrary'
import FunnelBuilder from './pages/FunnelBuilder'
import Guardrails from './pages/Guardrails'
import AIGenerator from './pages/AIGenerator'
import Pricing from './pages/Pricing'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <div className="grid-bg" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlueprint />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/tech-stack" element={<TechStack />} />
          <Route path="/assets" element={<AssetLibrary />} />
          <Route path="/funnel" element={<FunnelBuilder />} />
          <Route path="/guardrails" element={<Guardrails />} />
          <Route path="/ai" element={<AIGenerator />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
        <footer className="reveal">
          <p>BlueprintOS © 2026</p>
          <p>Designed for modern product teams.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
