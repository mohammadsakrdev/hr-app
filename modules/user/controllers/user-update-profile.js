const Joi = require('../../../helpers/joi');
const { User, Department } = require('mongoose').models;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

/**
 * Function to update  user profile
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
          fullName: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
          address: Joi.string().required(),
          phoneNumber: Joi.string().required()
        });

      const validation = Joi.validate(req.body, expectedBody);
      if (validation.error)
        return res.status(500).json({ message: validation.error });
    }

    const {
      userName,
      fullName,
      email,
      password,
      address,
      phoneNumber
    } = req.body;

    const [isEmailUsed, isUserNameUsed, isPhoneNumberUsed] = await Promise.all([
      User.findOne({ email }).select('_id'),
      User.findOne({ userName }).select('_id'),
      User.findOne({ phoneNumber }).select('_id')
    ]);

    if (isEmailUsed) {
      return res.status(400).json({
        success: false,
        message: 'Email used before'
      });
    }

    if (isUserNameUsed) {
      return res.status(400).json({
        success: false,
        message: 'User name used before'
      });
    }

    if (isPhoneNumberUsed) {
      return res.status(400).json({
        success: false,
        message: 'Phone number name used before'
      });
    }

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { userName, fullName, email, password: hash, address, phoneNumber }
    );

    return res.status(200).json({
      success: true,
      message: 'User profile updated successfully.',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'Something went wrong', data: null });
  }
};
