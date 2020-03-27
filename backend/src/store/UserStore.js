const GenericStore = require('./GenericStore');

class UserStore extends GenericStore {
  constructor({ UserModel }) {
    super();
    this.model = UserModel;
  }

  persist(user) {
    const { provider, providerId } = user;
    const filter = { provider, providerId };

    return this.model.findOneAndUpdate(filter, user, {
      new: true,
      upsert: true,
    });
  }
}

module.exports = UserStore;
