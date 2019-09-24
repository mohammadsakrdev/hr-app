const benefitControllers = require('./controllers');
const jsonParserTrue = require('body-parser').json({ extended: true });
const { isAllowed } = global.policies;

module.exports = function(app) {
  app.post(
    '/api/benefit/add-benefit/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.addBenefit
  );
  app.get(
    '/api/benefit/view-benefit/:benefitId/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.viewBenefit
  );
  app.put(
    '/api/benefit/update-benefit/:benefitId/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.updateBenefit
  );
  app.get(
    '/api/benefit/all-benefit/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.allBenefit
  );
  app.delete(
    '/api/benefit/delete-benefit/:benefitId/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.deleteBenefit
  );
  app.get(
    '/api/benefit/search-benefit-name/:name/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.searchBenefitByName
  );
  app.get(
    '/api/benefit/search-benefit-type/:benefitType/',
    jsonParserTrue,
    isAllowed,
    benefitControllers.searchBenefitByType
  );
};
