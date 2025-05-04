import express from 'express'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/error.handler.js'
import userRouter from './routes/user.routes.js'
import reviewRouter from './routes/review.routes.js'
import appRouter from './routes/app.routes.js'
import workRouter from './routes/work.routes.js'
import messageRouter from './routes/message.routes.js'
import AppError from './utils/appError.js'
import logger from './utils/logger.js'
import compression from 'compression'
import swaggerDocs from './utils/swagger.js'
import aiRouter from './routes/ai.routes.js'
import paymentRouter from './routes/payment.routes.js'

export async function initServer() {
  const app = express()
  // MIDDLEWARES
  if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
  app.use(express.static('uploads/profile-images'))
  app.use(helmet()) // Apply secure headers to all routes

  app.use(cookieParser())

  const corsOptions = {
    origin: [
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:5173'
        : 'https://worksphere35.vercel.app',
    ],
    credentials: true,
  }

  app.use(cors(corsOptions))
  // Route Handlers
  const limiter = rateLimit({
    max: 100, // Maximum number of requests allowed per IP within the window
    windowMs: 60 * 60 * 1000, // 1 hour in milliseconds
    message: 'Too many requests from this IP, please try again in an hour.', // Custom error message sent when limit is exceeded
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers (deprecated)
  })

  app.use(
    express.json({
      limit: '10kb', // Restrict JSON payload to 10 KB
    }),
  )

  app.use(mongoSanitize()) // Sanitize data to prevent NoSQL injection
  app.use(compression())

  app.get('/health', (req, res) => res.status(200).send('OK'))
  app.use('/api', limiter) // Apply rate limiting to all `/api` routes
  app.use('/api/v1/users', userRouter)
  app.use('/api/v1/ai', aiRouter)
  app.use('/api/v1/reviews', reviewRouter)
  app.use('/api/v1/work', workRouter)
  app.use('/api/v1/messages', messageRouter)
  app.use('/api/v1/app', appRouter)
  app.use('/api/v1/payment', paymentRouter)

  app.get('/', (req, res, next) => {
    res.status(200).json({
      status: 'success',
      message: 'Hello World',
    })
  })

  swaggerDocs(app, process.env.PORT)

  app.all('*', (req, res, next) => {
    logger.error(`Can't find ${req.originalUrl}`)
    next(new AppError(`Can't find ${req.originalUrl}`, 404))
  })

  app.use(errorHandler)

  return app
}
