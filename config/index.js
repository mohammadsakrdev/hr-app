const dotenv = require('dotenv');
dotenv.config();

const dev = require('./dev-config');
const production = require('./production-config');
const test = require('./test-config');

module.exports = (() => {
  let exportCfg;

  if (process.env.NODE_ENV === 'test') {
    exportCfg = {
      ...test()
    };
  } else if (process.env.NODE_ENV === 'prod') {
    exportCfg = {
      ...production()
    };
  } else {
    exportCfg = {
      ...dev()
    };
  }
  return exportCfg;
})();
