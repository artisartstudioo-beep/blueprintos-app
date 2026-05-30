import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM metrics WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { metric_name, value, date, notes } = req.body
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO metrics (user_id, metric_name, value, date, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, metric_name, value, date, notes, createdAt]
  )
  const item = runGet('SELECT * FROM metrics WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { metric_name, value, date, notes } = req.body
  runRun(
    'UPDATE metrics SET metric_name = ?, value = ?, date = ?, notes = ? WHERE id = ? AND user_id = ?',
    [metric_name, value, date, notes, req.params.id, req.user.id]
  )
  const item = runGet('SELECT * FROM metrics WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: item })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM metrics WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
