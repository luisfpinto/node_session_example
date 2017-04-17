const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const {User} = require('./models/user')
const path = require('path')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  console.log('This is the home view')
  res.sendFile('home.html', { root: path.join(__dirname, '../views/') })
  // res.send(200)
})

router.get('/list', (req, res) => {
  return User
    .find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}))
})

router.get('/loadsource', (req, res) => {
  console.log('Get source')
})

router.post('/signup', (req, res) => {
  // missing check fields
  // check for existing user
  let {email, password} = req.body
  return User
    .find({email})
    .count()
    .exec()
    .then((count) => {
      if (count > 0) {
        return res.status(422).json({message: 'username already taken'})
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          email,
          password: hash
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr())
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
})

router.post('/login', (req, res) => {
  console.log('Login user')
})

router.use('*', (req, res) => {
  return res.status(404).json({message: 'Not found, router'})
})

module.exports = {router}
