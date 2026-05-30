import initSqlJs from 'sql.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, 'data', 'blueprintos.db')
const schemaPath = path.join(__dirname, 'schema.sql')

let db = null

export const initializeDatabase = async () => {
  const SQL = await initSqlJs()
  
  let filebuffer = null
  if (fs.existsSync(dbPath)) {
    filebuffer = fs.readFileSync(dbPath)
  }
  
  db = new SQL.Database(filebuffer)
  
  if (!filebuffer) {
    const schema = fs.readFileSync(schemaPath, 'utf-8')
    const statements = schema.split(';').filter(s => s.trim())
    for (const statement of statements) {
      try {
        db.run(statement)
      } catch (err) {
        console.log('Schema statement error:', err.message)
      }
    }
    saveDb()
  }
}

const saveDb = () => {
  if (!db) return
  const data = db.export()
  const buffer = Buffer.from(data)
  const dataDir = path.join(__dirname, 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  fs.writeFileSync(dbPath, buffer)
}

export const runQuery = (sql, params = []) => {
  if (!db) return []
  try {
    const stmt = db.prepare(sql)
    stmt.bind(params)
    const results = []
    while (stmt.step()) {
      results.push(stmt.getAsObject())
    }
    stmt.free()
    return results
  } catch (err) {
    console.error('Query error:', err.message)
    return []
  }
}

export const runGet = (sql, params = []) => {
  if (!db) return null
  try {
    const stmt = db.prepare(sql)
    stmt.bind(params)
    let result = null
    if (stmt.step()) {
      result = stmt.getAsObject()
    }
    stmt.free()
    return result
  } catch (err) {
    console.error('Get error:', err.message)
    return null
  }
}

export const runRun = (sql, params = []) => {
  if (!db) return { lastInsertRowid: 0, changes: 0 }
  try {
    const stmt = db.prepare(sql)
    stmt.bind(params)
    stmt.step()
    stmt.free()
    
    const result = {
      lastInsertRowid: parseInt(db.exec('SELECT last_insert_rowid() as id')[0]?.values[0]?.[0] || 0),
      changes: db.getRowsModified(),
    }
    
    saveDb()
    return result
  } catch (err) {
    console.error('Run error:', err.message)
    return { lastInsertRowid: 0, changes: 0 }
  }
}
