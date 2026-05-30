import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM funnel_stages WHERE user_id = ? ORDER BY sort_order ASC, created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { stage_name, description, conversion_percentage } = req.body
  const sortOrder = runGet('SELECT MAX(sort_order) AS maxSort FROM funnel_stages WHERE user_id = ?', [req.user.id])?.maxSort ?? 0
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO funnel_stages (user_id, stage_name, description, conversion_percentage, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, stage_name, description, conversion_percentage, sortOrder + 1, createdAt]
  )
  const item = runGet('SELECT * FROM funnel_stages WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { stage_name, description, conversion_percentage, sort_order } = req.body
  runRun(
    'UPDATE funnel_stages SET stage_name = ?, description = ?, conversion_percentage = ?, sort_order = ? WHERE id = ? AND user_id = ?',
    [stage_name, description, conversion_percentage, sort_order, req.params.id, req.user.id]
  )
  const item = runGet('SELECT * FROM funnel_stages WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: item })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM funnel_stages WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
