const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

mongoose.Promise = global.Promise
const DATABASE_URL = 'mongodb://localhost/sessions'
const PORT = '8080'
const {router: usersRouter} = require('./src/router.js')

mongoose.connect(DATABASE_URL, err => {
  if (err) {
    console.log(err)
  }
  app.listen(PORT, () => {
    console.log(`Your app is listening on port ${PORT}`)
    console.log('App connected to the database')
  })
  .on('error', err => {
    if (err) console.log(err)
    mongoose.disconnect()
  })
})

app.use('/user', usersRouter)

app.use(express.static(path.join(__dirname, '/public')))

app.get('*', (req, res) => {
  return res.status(404).json({message: 'Not found'})
})
