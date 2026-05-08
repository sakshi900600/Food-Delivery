import express from 'express'
import cors from 'cors'
import foodRouter from '../routes/foodRoute.js'
import userRouter from '../routes/userRoute.js'
import cartRouter from '../routes/cartRoute.js'
import orderRoute from '../routes/orderRoute.js'
import adminRouter from '../routes/adminRoute.js'
import { logger } from '../utils/logger.js'
import { sendErrorResponse, sendSuccessResponse } from '../utils/errorHandler.js'
import 'dotenv/config'

const app = express()
const NODE_ENV = process.env.NODE_ENV || 'development'

// Middleware
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// CORS
const allowedOrigins = NODE_ENV === 'production'
  ? [
      process.env.PRODUCTION_FRONTEND_URL || 'https://naanstop-one.vercel.app',
      process.env.PRODUCTION_ADMIN_URL || '',
    ].filter(Boolean)
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}))

// Request logger
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/api/health', (req, res) => {
  sendSuccessResponse(res, 200, 'API is healthy', {
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    uptime: process.uptime(),
  })
})

// Routes
app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRoute)
app.use('/image', express.static('uploads'))
app.use('/api/admin', adminRouter)

// Root
app.get('/', (req, res) => {
  sendSuccessResponse(res, 200, 'API working 🚀', {
    message: 'Welcome to Food Delivery API',
    version: '1.0.0',
  })
})

// 404
app.use((req, res) => {
  sendErrorResponse(res, 404, 'Endpoint not found')
})

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled Error:', { message: err.message, path: req.path })
  sendErrorResponse(res, err.statusCode || 500, err.message || 'Internal Server Error')
})

export default app