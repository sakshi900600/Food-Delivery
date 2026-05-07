import mongoose from 'mongoose'
import { logger } from '../utils/logger.js'
import { DB_CONFIG } from './constants.js'

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL is not defined in environment variables')
    }

    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: DB_CONFIG.connectionTimeout,
      retryWrites: true,
      w: 'majority',
    }

    await mongoose.connect(process.env.MONGODB_URL, mongooseOptions)

    logger.info('✅ MongoDB connection established successfully', {
      database: process.env.MONGODB_URL.split('/').pop(),
      status: 'connected',
    })

    // Connection event listeners
    mongoose.connection.on('disconnected', () => {
      logger.warn('⚠️ MongoDB connection disconnected')
    })

    mongoose.connection.on('error', (error) => {
      logger.error('❌ MongoDB connection error', error)
    })

    return mongoose.connection
  } catch (error) {
    logger.error('❌ Failed to connect to MongoDB', {
      error: error.message,
      mongodb_url: process.env.MONGODB_URL ? '***' : 'Not provided',
    })
    process.exit(1)
  }
}