import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// MIDDLEWARES
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Route Handlers

app.use('/api/v1/users', userRouter)

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello World',
  })
})

app.use(errorHandler)

export default app
