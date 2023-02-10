const Fastify = require('fastify')
const dotenv = require('dotenv')
const { connectDB } = require('./config/db')

// * PRE-CONFIG
dotenv.config()
connectDB()
require('colors')

// * VARS
const app = Fastify({ logger: false })
const PORT = process.env.PORT || 5000

// * CONFIG
app.register(require('@fastify/formbody'))

// * ROUTES
app.register(require('./routes/userRouter'), { path: '/api/users' })

// * SERVER LISTEN
app.listen({ port: PORT }, err => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
