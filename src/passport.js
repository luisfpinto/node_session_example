const passport = require('passport')
const User = require('./models/user')

passport.serializeUser(function (user, done) {
  done(null, user._id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

module.exports = {serializeUser, deserializeUser}
