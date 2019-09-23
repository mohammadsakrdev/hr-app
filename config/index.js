const dotenv = require('dotenv');
dotenv.config();

const dev = require('./dev');
const production = require('./production');
const test = require('./test');

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
