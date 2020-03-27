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
]], {
  cwd: __dirname,
  resolverOptions: {
    injectionMode: InjectionMode.PROXY,
  },
});

module.exports = container;
