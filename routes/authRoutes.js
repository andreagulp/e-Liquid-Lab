const passport = require('passport')
const requireLogin = require('../middlewares/requireLogin')

module.exports = (app) => {

  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard')
    }
  )

  app.get('/api/logout', requireLogin, (req, res) => {
    req.logout();
    res.redirect('/')
  })

  app.get('/api/current_user', (req, res) => {
    res.send(req.user)
  })

}
