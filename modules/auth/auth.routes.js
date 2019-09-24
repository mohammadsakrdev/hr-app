const authControllers = require('./controllers');
const jsonParserTrue = require('body-parser').json({ extended: true });
const { isAllowed } = global.policies;

module.exports = function(app) {
  app.post('/api/auth/login/', jsonParserTrue, authControllers.userLogin);
  app.post(
    '/api/auth/user-register/',
    jsonParserTrue,
    isAllowed,
    authControllers.userRegister
  );
};
