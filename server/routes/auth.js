import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { runGet, runRun } from '../db.js'

dotenv.config()

const router = express.Router()
const jwtSecret = process.env.JWT_SECRET || 'change-this-secret'

router.post('/register', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' })
  }

  const existingUser = runGet('SELECT id FROM users WHERE email = ?', [email])
  if (existingUser) {
    return res.status(409).json({ message: 'Email already registered' })
  }

  const password_hash = bcrypt.hashSync(password, 10)
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO users (name, email, password_hash, created_at) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, createdAt]
  )

  const token = jwt.sign({ id: result.lastInsertRowid, email }, jwtSecret, { expiresIn: '7d' })
  res.json({ token, user: { id: result.lastInsertRowid, name, email } })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  const user = runGet('SELECT id, name, email, password_hash FROM users WHERE email = ?', [email])
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const isValid = bcrypt.compareSync(password, user.password_hash)
  if (!isValid) {
    return res.status(401).json({ message: 'Invalid email or password' })
  }

  const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
})

router.get('/me', (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    const user = runGet('SELECT id, name, email, created_at FROM users WHERE id = ?', [payload.id])
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ user })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
})

export default router
