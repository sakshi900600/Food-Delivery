import express from 'express'
import cors from 'cors'
import { connectDB } from '../config/db.js'
import foodRouter from '../routes/FoodRoute.js'
import userRouter from '../routes/userRoute.js'
import cartRouter from '../routes/cartRoute.js'
import orderRoute from '../routes/orderRoute.js'
import { logger } from '../utils/logger.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/errorHandler.js'
import { CORS_OPTIONS } from '../config/constants.js'
import 'dotenv/config'

// Initialize Express app
const app = express()
const NODE_ENV = process.env.NODE_ENV || 'development'

// ==================== MIDDLEWARE ====================

// Body Parser Middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// CORS Middleware
const corsOptions = NODE_ENV === 'production' ? CORS_OPTIONS.production : CORS_OPTIONS.development
app.use(cors(corsOptions))

// Request Logging Middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  })
  next()
})

// Health Check Middleware
app.use('/api/health', (req, res) => {
  sendSuccessResponse(res, 200, 'API is healthy', {
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
  })
})

// ==================== DATABASE CONNECTION ====================
connectDB()

// ==================== ROUTES ====================

// API Routes
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRoute)

// Static Files
app.use('/image', express.static('uploads'))

// Test/Welcome Route
app.get('/', (req, res) => {
  sendSuccessResponse(res, 200, 'API working 🚀', {
    message: 'Welcome to Food Delivery API',
    version: '1.0.0',
    endpoints: {
      user: '/api/user',
      food: '/api/food',
      cart: '/api/cart',
      order: '/api/order',
      health: '/api/health',
    },
  })
})

// ==================== ERROR HANDLING ====================

// 404 Not Found Handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.path}`)
  sendErrorResponse(res, 404, 'Endpoint not found', `${req.method} ${req.path} does not exist`)
})

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  logger.error('Unhandled Error:', {
    message,
    statusCode,
    path: req.path,
    method: req.method,
    stack: err.stack,
  })

  sendErrorResponse(res, statusCode, message, NODE_ENV === 'development' ? err : null)
})

export default app