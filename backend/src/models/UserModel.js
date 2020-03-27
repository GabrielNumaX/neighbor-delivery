const { model, Schema } = require('mongoose');

const schema = new Schema({
  accessToken: String,
  refreshToken: String,
  provider: String,
  providerId: String,
});

module.exports = model('User', schema);
