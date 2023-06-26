const winston = require("winston")
const { format } = winston
const { combine, timestamp, printf } = format

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`
})

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), logFormat),
  transports: [
    new winston.transports.File({ filename: "logs.log" }),

    new winston.transports.RabbitMQ({
      exchange: "logs",
      exchangeOptions: {
        durable: false,
      },
      host: "localhost",
      port: 5672,
      username: "guest",
      password: "guest",
    }),
  ],
})

module.exports = logger
