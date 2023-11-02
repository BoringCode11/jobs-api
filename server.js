require('dotenv').config()
require('express-async-errors')

// extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

// connect DB
const connectDB = require('./db/connect')

// routers
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')

// middleware
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const authMiddleware = require('./middleware/auth')

app.set('trust proxy', 1)
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authMiddleware, jobsRouter)

app.use(errorHandler)
app.use(notFound)

const PORT = process.env.PORT || 3500
const start = (async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, () => console.log(`running on http//localhost:${PORT}`))
  } catch (error) {
    console.log(error.message);
  }
})()