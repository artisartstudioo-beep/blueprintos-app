import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { initializeDatabase } from './db.js'
import authRoutes from './routes/auth.js'
import blueprintsRoutes from './routes/blueprints.js'
import metricsRoutes from './routes/metrics.js'
import techStackRoutes from './routes/techStack.js'
import assetsRoutes from './routes/assets.js'
import funnelsRoutes from './routes/funnels.js'
import guardrailsRoutes from './routes/guardrails.js'
import exportsRoutes from './routes/exports.js'

dotenv.config()

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 5000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5174'
const allowedOrigins = CLIENT_URL.split(',').map((origin) => origin.trim())
const distPath = path.join(__dirname, '../dist')

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error('Not allowed by CORS'))
  },
}))
app.use(express.json())

// Startup environment info
console.log('Environment: ', process.env.NODE_ENV || 'development')
console.log('Configured PORT:', PORT)
console.log('CLIENT_URL(s):', allowedOrigins.join(', '))
console.log('JWT_SECRET set:', !!process.env.JWT_SECRET)

const startServer = async () => {
  console.log('Starting server initialization...')
  console.log('Loading database...')
  await initializeDatabase()
  console.log('Database initialized')

  app.use('/api/auth', authRoutes)
  app.use('/api/blueprints', blueprintsRoutes)
  app.use('/api/metrics', metricsRoutes)
  app.use('/api/tech-stack', techStackRoutes)
  app.use('/api/assets', assetsRoutes)
  app.use('/api/funnels', funnelsRoutes)
  app.use('/api/guardrails', guardrailsRoutes)
  app.use('/api/exports', exportsRoutes)

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
  })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath))

    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next()
      }
      res.sendFile(path.join(distPath, 'index.html'))
    })
  }

  app.use((err, req, res, next) => {
    console.error('Express error handler:', err)
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
  })

  const server = app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
    console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`)
  })

  server.on('error', (err) => {
    console.error('Server failed to start:', err)
    process.exit(1)
  })

  // Global error handlers to surface unexpected failures
  process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection at:', reason)
  })

  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err)
    process.exit(1)
  })
}

startServer().catch(err => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
