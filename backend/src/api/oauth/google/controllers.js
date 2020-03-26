const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function auth(accessToken, refreshToken, profile, cb) {
  console.log('>>> profile', profile);
  cb(null, profile);
}

function callback(req, res) {
  res.send('callback');
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/oauth/google/callback`,
}, auth));

module.exports = {
  auth: passport.authenticate('google', { scope: ['profile'] }),
  callback: [
    passport.authenticate('google', { failureRedirect: '/api/oauth/google' }),
    callback,
  ],
};
