const userControllers = require('./controllers');
const jsonParserTrue = require('body-parser').json({ extended: true });
const { isAllowed } = global.policies;

module.exports = function(app) {
  app.get(
    '/api/user/user-profile/',
    jsonParserTrue,
    isAllowed,
    userControllers.userProfile
  );
  app.put(
    '/api/user/user-update-profile/',
    jsonParserTrue,
    isAllowed,
    userControllers.userUpdateProfile
  );
  app.get(
    '/api/user/all-user/',
    jsonParserTrue,
    isAllowed,
    userControllers.allUser
  );
  app.put(
    '/api/user/update-user/:userId/',
    jsonParserTrue,
    isAllowed,
    userControllers.updateUser
  );
  app.delete(
    '/api/user/delete-user/:userId/',
    jsonParserTrue,
    isAllowed,
    userControllers.deleteUser
  );
  app.get(
    '/api/user/view-user/:userId/',
    jsonParserTrue,
    isAllowed,
    userControllers.viewUser
  );
};
