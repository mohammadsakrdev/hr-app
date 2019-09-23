const Joi = require('joi');

const CustomJoi = Joi.defaults(setAbortEarlyToFalse)
  .extend(mongoIdValidator)
  .extend(mobileNumberValidator);

function setAbortEarlyToFalse (joi) {
  return joi.options({ abortEarly: false });
}

function mongoIdValidator (joi) {
  return {
    base: joi.string().regex(/^[0-9a-fA-F]{24}$/),
    name: 'mongoId'
  };
}

function mobileNumberValidator (joi) {
  return {
    base: joi.number().min(500000000).max(600000000),
    name: 'mobile'
  };
}


module.exports = CustomJoi;