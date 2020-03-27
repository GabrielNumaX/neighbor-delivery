const { omit } = require('lodash');
const GenericStore = require('./GenericStore');

class UserStore extends GenericStore {
  constructor({ UserModel }) {
    super(UserModel);
  }

  persist(user) {
    const { provider, providerId } = user;
    const filter = { provider, providerId };

    return this.model.findOneAndUpdate(filter, user, {
      new: true,
      upsert: true,
    });
  }

  async fetchById(id) {
    // TODO: enrich with google information
    const user = await super.fetchById(id);
    return user && omit(user, ['accessToken', 'refreshToken']);
  }
}

module.exports = UserStore;
