// Simple logger utility for development and production
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
}

const getTimestamp = () => {
  return new Date().toISOString()
}

const formatLog = (level, message, data = null) => {
  const timestamp = getTimestamp()
  const logMessage = `[${timestamp}] [${level}] ${message}`
  
  if (data) {
    return `${logMessage}\n${JSON.stringify(data, null, 2)}`
  }
  return logMessage
}

export const logger = {
  error: (message, data = null) => {
    console.error(formatLog(LOG_LEVELS.ERROR, message, data))
  },

  warn: (message, data = null) => {
    console.warn(formatLog(LOG_LEVELS.WARN, message, data))
  },

  info: (message, data = null) => {
    console.log(formatLog(LOG_LEVELS.INFO, message, data))
  },

  debug: (message, data = null) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(formatLog(LOG_LEVELS.DEBUG, message, data))
    }
  },
}
