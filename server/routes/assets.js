import express from 'express'
import { runGet, runQuery, runRun } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/', (req, res) => {
  const items = runQuery('SELECT * FROM assets WHERE user_id = ? ORDER BY created_at DESC', [req.user.id])
  res.json({ data: items })
})

router.post('/', (req, res) => {
  const { asset_name, type, link, notes } = req.body
  const createdAt = new Date().toISOString()
  const result = runRun(
    'INSERT INTO assets (user_id, asset_name, type, link, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [req.user.id, asset_name, type, link, notes, createdAt]
  )
  const item = runGet('SELECT * FROM assets WHERE id = ?', [result.lastInsertRowid])
  res.json({ data: item })
})

router.put('/:id', (req, res) => {
  const { asset_name, type, link, notes } = req.body
  runRun(
    'UPDATE assets SET asset_name = ?, type = ?, link = ?, notes = ? WHERE id = ? AND user_id = ?',
    [asset_name, type, link, notes, req.params.id, req.user.id]
  )
  const item = runGet('SELECT * FROM assets WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ data: item })
})

router.delete('/:id', (req, res) => {
  runRun('DELETE FROM assets WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  res.json({ success: true })
})

export default router
