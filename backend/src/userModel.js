const { model, Schema, Types } = require('mongoose');

const schema = new Schema({
  name: 'string',
  accessToken: 'string',
  provider: 'string',
});

module.exports = model('User', schema);
