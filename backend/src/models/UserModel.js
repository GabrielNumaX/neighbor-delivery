const { model, Schema } = require('mongoose');

const schema = new Schema({
  provider: String,
});

module.exports = model('User', schema);
