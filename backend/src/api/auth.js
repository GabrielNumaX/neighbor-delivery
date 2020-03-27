const { asValue } = require('awilix');
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
  try {
    const authorization = req.headers.Authorization || req.headers.authorization;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Error('Bearer not found');
    }

    const { jwtSecret, UserStore } = req.container.cradle;
    const { _id: id } = jwt.verify(token, jwtSecret);
    const user = await UserStore.fetchById(id);
    console.log('>>> user', user);

    req.container.register({ user: asValue(user) });
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send();
  }
}

module.exports = auth;
