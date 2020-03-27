const { omit } = require('lodash');

async function wrapOne(resolve) {
  let record;
  try {
    record = await resolve;
  } catch (err) {
    console.error(err);
    record = null;
  }
  if (!record) {
    return null;
  }

  const { _id: id, ...rest } = record && record.toObject();
  return omit({ ...rest, id }, ['__v']);
}

class GenericStore {
  constructor(model) {
    this.model = model;
  }

  async fetchById(id) {
    return wrapOne(this.model.findById(id));
  }
}

module.exports = GenericStore;
