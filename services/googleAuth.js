const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const jwt = require('jsonwebtoken')
const keys = require('../config')
const models = require('../models')

var userId

const googleOauth = new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === 'production'
        ? `${keys.PROD_URL}/api/google/callback`
        : `http://localhost:${keys.PORT_BACKEND}/api/google/callback`,
    passRequestToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      const googleId = profile.id
      const user = await models.User.findOne({ googleId })

      if (!user) {
        const newUser = new models.User({
          googleId,
          username: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        })
        const savedUser = await newUser.save()

        userId = savedUser._id

        const token = jwt.sign(
          {
            id: savedUser._id
          },
          keys.JWT_SECRET,
          { expiresIn: '30d' }
        )
        savedUser.jwt = token
        await savedUser.save()
        return done(null, {})
      } else {
        userId = user._id
        const newToken = jwt.sign(
          {
            id: user._id
          },
          keys.JWT_SECRET,
          { expiresIn: '30d' }
        )
        user.jwt = newToken
        await user.save()
        done(null, {})
      }
    } catch (error) {
      console.log(error)
    }
  }
)

const googleScope = passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ]
})

const googleCallback = passport.authenticate('google', {
  failureRedirect:
    process.env.NODE_ENV === 'production'
      ? `${key.PROD_URL}/failure/`
      : `http://localhost:${keys.PORT_FRONTEND}/failure/`,
  session: false
})

const googleRedirect = (req, res) => {
  res.redirect(
    process.env.NODE_ENV === 'production'
      ? `${keys.PROD_URL}/user/${userId}`
      : `http://localhost:${keys.PORT_FRONTEND}/user/${userId}`
  )
}

module.exports = {
  googleOauth,
  googleScope,
  googleCallback,
  googleRedirect
}
