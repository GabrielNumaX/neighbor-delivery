const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function auth(accessToken, refreshToken, profile, cb) {
  cb(null, { accessToken, refreshToken, profile });
}

async function callback(req, res) {
  const { profile, accessToken, refreshToken } = req.user;
  const { id, provider } = profile;

  const { UserModel } = req.container.cradle;
  const user = await UserModel.findOne({ id });
  if (!user) {
    await UserModel.create({
      name: id,
      accessToken,
      refreshToken,
      provider,
    });
  }

  res.send('callback');
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
