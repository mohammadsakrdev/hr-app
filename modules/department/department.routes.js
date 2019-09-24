const departmentControllers = require('./controllers');
const jsonParserTrue = require('body-parser').json({ extended: true });
const { isAllowed } = global.policies;

module.exports = function(app) {
  app.post(
    '/api/department/add-department/',
    jsonParserTrue,
    isAllowed,
    departmentControllers.addDepartment
  );
  app.get(
    '/api/department/view-department/:departmentId/',
    jsonParserTrue,
    isAllowed,
    departmentControllers.viewDepartment
  );
  app.put(
    '/api/department/update-department/:departmentId/',
    jsonParserTrue,
    isAllowed,
    departmentControllers.updateDepartment
  );
  app.get(
    '/api/department/all-department/',
    jsonParserTrue,
    isAllowed,
    departmentControllers.allDepartment
  );
  app.delete(
    '/api/department/delete-department/:departmentId/',
    jsonParserTrue,
    isAllowed,
    departmentControllers.deleteDepartment
  );
};
