import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM blueprints WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { business_name, niche, main_offer, target_audience, main_goal, current_tools, biggest_bottleneck } = req.body
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO blueprints (user_id, business_name, niche, main_offer, target_audience, main_goal, current_tools, biggest_bottleneck, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [req.user.id, business_name, niche, main_offer, target_audience, main_goal, current_tools, biggest_bottleneck, createdAt]
  )
  const blueprint = runGet('SELECT * FROM blueprints WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: blueprint })
})

router.get('/:id', (req, res) => {
  const item = runGet('SELECT * FROM blueprints WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  if (!item) {
    return res.status(404).json({ message: 'Blueprint not found' })
  }
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { business_name, niche, main_offer, target_audience, main_goal, current_tools, biggest_bottleneck } = req.body
  runRun(
    'UPDATE blueprints SET business_name = ?, niche = ?, main_offer = ?, target_audience = ?, main_goal = ?, current_tools = ?, biggest_bottleneck = ? WHERE id = ? AND user_id = ?',
    [business_name, niche, main_offer, target_audience, main_goal, current_tools, biggest_bottleneck, req.params.id, req.user.id]
  )
  const updated = runGet('SELECT * FROM blueprints WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: updated })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM blueprints WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
