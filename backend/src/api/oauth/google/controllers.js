const passport = require('passport');
const jwt = require('jsonwebtoken');
const { pick } = require('lodash');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function auth(accessToken, refreshToken, profile, cb) {
  cb(null, { accessToken, refreshToken, profile });
}

async function callback(req, res) {
  const { profile, accessToken, refreshToken } = req.user;
  const { id, provider } = profile;

  const { jwtSecret, UserStore } = req.container.cradle;
  const user = await UserStore.persist({
    provider,
    providerId: id,
    accessToken,
    refreshToken,
  });

  const token = jwt.sign(
    pick(user, ['_id']),
    jwtSecret,
    { expiresIn: 3600 * 24 * 30 }, // 30 days
  );

  // TODO: must redirect somewhere
  res.send(`token = ${token}`);
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/api/oauth/google/callback`,
}, auth));

module.exports = {
  auth: passport.authenticate('google', { scope: ['profile'], accessType: 'offline' }),
  callback: [
    passport.authenticate('google', { failureRedirect: '/api/oauth/google' }),
    callback,
  ],
};
