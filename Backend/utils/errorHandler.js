// Error handling utility
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}

export const sendErrorResponse = (res, statusCode, message, error = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && error && { error: error.message }),
  })
}

export const sendSuccessResponse = (res, statusCode, message, data = null) => {
  res.status(statusCode).json({
    success: true,
    message,
    ...(data && { data }),
  })
}

// Async handler to wrap controller functions
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
