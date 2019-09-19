const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const locationsRouter = require('./controllers/locations')
const eventsRouter = require('./controllers/events')
const mongoose = require('mongoose')

const url = 'mongodb+srv://pakedi:1234@cluster0-aokec.mongodb.net/rajapinnat?retryWrites=true&w=majority'

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  app.use(cors())
  app.use(express.static('build'))
  app.use(bodyParser.json())

  app.use('/api/locations', locationsRouter)
  app.use('/api/events', eventsRouter)

  module.exports = app