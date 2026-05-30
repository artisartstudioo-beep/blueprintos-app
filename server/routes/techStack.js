import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM tech_stack WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { tool_name, category, monthly_cost, purpose, status } = req.body
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO tech_stack (user_id, tool_name, category, monthly_cost, purpose, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.user.id, tool_name, category, monthly_cost, purpose, status, createdAt]
  )
  const item = runGet('SELECT * FROM tech_stack WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { tool_name, category, monthly_cost, purpose, status } = req.body
  runRun(
    'UPDATE tech_stack SET tool_name = ?, category = ?, monthly_cost = ?, purpose = ?, status = ? WHERE id = ? AND user_id = ?',
    [tool_name, category, monthly_cost, purpose, status, req.params.id, req.user.id]
  )
  const item = runGet('SELECT * FROM tech_stack WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: item })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM tech_stack WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
