import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM guardrails WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { rule_title, category, rule_description } = req.body
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO guardrails (user_id, rule_title, category, rule_description, created_at) VALUES (?, ?, ?, ?, ?)',
    [req.user.id, rule_title, category, rule_description, createdAt]
  )
  const item = runGet('SELECT * FROM guardrails WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { rule_title, category, rule_description } = req.body
  runRun(
    'UPDATE guardrails SET rule_title = ?, category = ?, rule_description = ? WHERE id = ? AND user_id = ?',
    [rule_title, category, rule_description, req.params.id, req.user.id]
  )
  const item = runGet('SELECT * FROM guardrails WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: item })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM guardrails WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
