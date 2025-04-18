const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');

// Define log format
const logFormat = format.printf(({ timestamp, level, message }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Set up daily rotation transport
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: 'logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '7d', // Keep logs for 7 days
  zippedArchive: true, // Optional: compress old logs
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // new transports.Console(),
    dailyRotateFileTransport
  ]
});

module.exports = logger;