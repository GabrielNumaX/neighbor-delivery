const {
  asClass,
  asFunction,
  asValue,
  createContainer,
  InjectionMode,
  Lifetime,
} = require('awilix');

const container = createContainer();

container.loadModules([[
  'models/**/*.js', {
    register: asValue,
    lifetime: Lifetime.SINGLETON,
  },
], [
  'store/**/*.js', {
    register: asClass,
    lifetime: Lifetime.SINGLETON,
  },
], [
  'services/**/*.js', {
    lifetime: Lifetime.SCOPED,
  },
],
], {
  cwd: __dirname,
  resolverOptions: {
    injectionMode: InjectionMode.PROXY,
    register: asFunction,
  },
});

container.register({
  jwtSecret: asValue(process.env.JWT_SECRET),
});


module.exports = container;
