const glob = require('glob');
const path = require('path');

module.exports = app => {
  const routes = glob.sync('./modules/**/*.routes.js');
  routes.forEach(route => {
    require(path.resolve(route))(app);
  });
};