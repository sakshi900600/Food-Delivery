// Database configuration constants
export const DB_CONFIG = {
  maxRetries: 3,
  retryDelay: 5000,
  connectionTimeout: 30000,
}

// Server configuration
export const SERVER_CONFIG = {
  defaultPort: 4000,
  defaultHost: 'localhost',
}

// File upload configuration
export const UPLOAD_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  uploadDir: 'uploads',
  allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
}

// Pagination configuration
export const PAGINATION_CONFIG = {
  defaultLimit: 10,
  maxLimit: 100,
  defaultPage: 1,
}

// API response messages
export const API_MESSAGES = {
  SUCCESS: 'Operation successful',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  INVALID_INPUT: 'Invalid input provided',
  SERVER_ERROR: 'Internal server error',
}

// CORS configuration
export const CORS_OPTIONS = {
  development: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  production: {
    origin: [
      process.env.PRODUCTION_FRONTEND_URL || 'https://yourdomain.com',
      process.env.PRODUCTION_ADMIN_URL || 'https://admin.yourdomain.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
}

// Authentication
export const AUTH_CONFIG = {
  tokenExpiry: '7d',
  refreshTokenExpiry: '30d',
  passwordMinLength: 6,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
}

// Order status
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}
