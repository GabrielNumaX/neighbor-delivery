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
]], {
  cwd: __dirname,
  resolverOptions: {
    injectionMode: InjectionMode.PROXY,
  },
});

container.register({
  jwtSecret: asValue(process.env.JWT_SECRET),
})


module.exports = container;
