module.exports = app => {
  require('./init-db');
  require('./init-models');
  require('./init-seed-initial-data');
  require('./init-policy')();
  require('./init-routes')(app);
};
