import app from './api/index.js'
import { logger } from './utils/logger.js'
import 'dotenv/config'

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'

const server = app.listen(PORT, () => {
  logger.info(`🚀 Food Delivery API Server Running`, {
    port: PORT,
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
  })
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('❌ Unhandled Rejection at:', {
    promise,
    reason: reason?.message || reason,
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('❌ Uncaught Exception:', {
    message: error.message,
    stack: error.stack,
  })
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('📋 SIGTERM received. Shutting down gracefully...')
  server.close(() => {
    logger.info('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('📋 SIGINT received. Shutting down gracefully...')
  server.close(() => {
    logger.info('✅ Server closed')
    process.exit(0)
  })
})

export default server
