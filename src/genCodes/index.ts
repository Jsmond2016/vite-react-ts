/* eslint-disable @typescript-eslint/no-var-requires */
const demo = require('./demo.config');
const product = require('./product.config');

module.exports = [...demo, ...product];
