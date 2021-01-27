// eslint-disable-next-line no-unused-vars
const jestConfig = require('./jest.config');

// eslint-disable-next-line no-underscore-dangle
global.___loader = {
  enqueue: jest.fn(),
};
