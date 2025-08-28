const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const fs = require('fs')
const path = require('path')

async function setupDatabase() {
  try {
    console.log('Setting up SQLite database...')
    
    // Ensure database directory exists
    const dbDir = path.join(__dirname, '..', 'database')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }
    
    // Open database connection
    const db = await open({
      filename: path.join(dbDir, 'waterlily.db'),
      driver: sqlite3.Database
    })
    
    // Read and execute schema
    const schemaPath = path.join(dbDir, 'schema.sql')
    const schema = fs.readFileSync(schemaPath, 'utf8')
    
    await db.exec(schema)
    console.log('Database schema created successfully')
    
    await db.close()
    console.log('Database setup complete!')
    
  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  }
}

setupDatabase()