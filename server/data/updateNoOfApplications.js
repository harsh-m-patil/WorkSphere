import mongoose from 'mongoose'

const DATABASE_URL = 'mongodb://localhost:27017/WorkSpherev2'
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Database connection error:', err))
