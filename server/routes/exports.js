import express from 'express'
import { runGet, runQuery } from '../db.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()
router.use(authenticateToken)

router.get('/blueprint/:id', (req, res) => {
  const blueprint = runGet('SELECT * FROM blueprints WHERE id = ? AND user_id = ?', [req.params.id, req.user.id])
  if (!blueprint) {
    return res.status(404).json({ message: 'Blueprint not found' })
  }

  const [metrics, tech, assets, funnels, guardrails] = [
    runQuery('SELECT * FROM metrics WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]),
    runQuery('SELECT * FROM tech_stack WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]),
    runQuery('SELECT * FROM assets WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]),
    runQuery('SELECT * FROM funnel_stages WHERE user_id = ? ORDER BY sort_order ASC, created_at DESC', [req.user.id]),
    runQuery('SELECT * FROM guardrails WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]),
  ]

  res.json({
    blueprint,
    metrics,
    techStack: tech,
    assets,
    funnels,
    guardrails,
  })
})

export default router
