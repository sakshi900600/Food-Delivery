import 'dotenv/config'
import app from './api/index.js'
import { logger } from './utils/logger.js'
import { connectDB } from './config/db.js'

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'

connectDB()

const server = app.listen(PORT, () => {
  logger.info(`🚀 Food Delivery API Server Running`, {
    port: PORT,
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

process.on('unhandledRejection', (reason) => {
  logger.error('❌ Unhandled Rejection:', { reason: reason?.message || reason })
})

process.on('uncaughtException', (error) => {
  logger.error('❌ Uncaught Exception:', { message: error.message })
  process.exit(1)
})

process.on('SIGTERM', () => {
  server.close(() => process.exit(0))
})

process.on('SIGINT', () => {
  server.close(() => process.exit(0))
})

export default server