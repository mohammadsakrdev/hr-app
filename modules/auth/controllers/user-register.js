const Joi = require('../../../helpers/joi');
const { User, Department } = require('mongoose').models;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

/**
 * Function to register new user by hr
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
          role: Joi.string()
            .required()
            .valid('HR', 'Employee'),
          department: Joi.mongoId().required(),
          salary: Joi.number().required(),
          address: Joi.string().required(),
          position: Joi.string().required(),
          manager: Joi.mongoId().required(),
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
      role,
      department,
      salary,
      address,
      position,
      manager,
      phoneNumber
    } = req.body;

    const [
      isUserRegistered,
      isManagerExist,
      isUserNameUsed,
      isPhoneNumberUsed,
      isDepartmentExist
    ] = await Promise.all([
      User.findOne({ email }).select('_id'),
      User.findOne({ _id: manager }).select('_id'),
      User.findOne({ userName }).select('_id'),
      User.findOne({ phoneNumber }).select('_id'),
      Department.findOne({ _id: department }).select('_id')
    ]);

    if (isUserRegistered) {
      return res.status(400).json({
        success: false,
        message: 'User registered before'
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

    if (!isManagerExist) {
      return res.status(400).json({
        success: false,
        message: 'Manager not found'
      });
    }

    if (!isDepartmentExist) {
      return res.status(400).json({
        success: false,
        message: 'Department not found'
      });
    }

    const newUser = new User({
      userName,
      fullName,
      email,
      password,
      role,
      department,
      salary,
      address,
      position,
      manager,
      phoneNumber
    });

    newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: 'User Created successfully.',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'Something went wrong', data: null });
  }
};
