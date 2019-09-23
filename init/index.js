module.exports = app => {
  require('./init-db');
  require('./init-models');
  // require('./init.seedInitialData');
  require('./init-policy')();
  require('./init-routes')(app);
  // require('./init.swagger-doc')(app);
};