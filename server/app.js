import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/error.handler.js'
import userRouter from './routes/user.routes.js'
import reviewRouter from './routes/review.routes.js'
import appRouter from './routes/app.routes.js'
import workRouter from './routes/work.routes.js'
import AppError from './utils/appError.js'
import logger from './utils/logger.js'
import workRouter from './routes/work.routes.js'

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

app.use(cors(corsOptions))
// Route Handlers

app.use('/api/v1/users', userRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/work', workRouter)
app.use('/api/v1/app', appRouter)

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World',
  })
})

app.all('*', (req, res, next) => {
  logger.error(`Can't find ${req.originalUrl}`)
  next(new AppError(`Can't find ${req.originalUrl}`, 404))
})

app.use(errorHandler)

export default app
