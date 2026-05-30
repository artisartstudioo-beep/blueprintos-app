import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET || 'change-this-secret'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Missing authentication token' })
  }

  try {
    const payload = jwt.verify(token, jwtSecret)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}
