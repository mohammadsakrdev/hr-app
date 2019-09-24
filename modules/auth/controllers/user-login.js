const jwt = require('jsonwebtoken');
const Joi = require('../../../helpers/joi');
const { User } = require('mongoose').models;
const config = require('../../../config');

/**
 * Function to allow user to login
 * @function
 *
 * @param {Object} req The express request
 * @param {Object} res The express response
 * @param {Function} next - The express next middleware function
 * @return {Object}
 */
module.exports = async (req, res, next) => {
  try {
    {
      // validation
      const expectedBody = Joi.object()
        .required()
        .keys({
          userName: Joi.string().required(),
          password: Joi.string().required()
        });

      const validation = Joi.validate(req.body, expectedBody);
      if (validation.error)
        return res
          .status(500)
          .json({ success: false, message: validation.error, data: null });
    }
    const { userName, password } = req.body;
    const user = await User.findOne({
      userName
    });

    if (!user)
      return res.status(400).json({
        success: false,
        message: 'Login failed',
        data: null
      });

    if (!user.validPassword(password))
      return res.status(400).json({
        success: false,
        message: 'Login failed',
        data: null
      });

    const payload = {
      _id: user._id,
      role: user.role
    };

    // Sign Token
    jwt.sign(
      payload,
      config.jwtSecret,
      { algorithm: 'HS256', expiresIn: '14d' },
      (err, token) => {
        return res.status(200).json({
          success: true,
          message: 'User logged in successfully.',
          data: `Bearer ${token}`
        });
      }
    );
  } catch (err) {
    console.log(`@Error: ${err}`);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
