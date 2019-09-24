const Joi = require('../../../helpers/joi');
const { User, Department } = require('mongoose').models;
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const config = require('../../../config');

/**
 * Function to update user by hr
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

    const { userId } = req.params;

    const [
      isUserExist,
      isEmailUsed,
      isUserNameUsed,
      isPhoneNumberUsed,
      isManagerExist,
      isDepartmentExist
    ] = await Promise.all([
      User.findOne({ _id: userId }).select('_id'),
      User.findOne({ email }).select('_id'),
      User.findOne({ userName }).select('_id'),
      User.findOne({ phoneNumber }).select('_id'),
      User.findOne({ _id: manager }).select('_id'),
      Department.findOne({ _id: department }).select('_id')
    ]);

    if (!isUserExist) {
      return res.status(400).json({
        success: false,
        message: 'User not found'
      });
    }

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

    if (!isManagerExist) {
      return res.status(400).json({
        success: false,
        message: 'Manager not found'
      });
    }

    if (isDepartmentExist) {
      return res.status(400).json({
        success: false,
        message: 'Department not found'
      });
    }

    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

    await User.findOneAndUpdate(
      { _id: userId },
      {
        userName,
        fullName,
        email,
        password: hash,
        role,
        department,
        salary,
        address,
        position,
        manager,
        phoneNumber
      }
    );

    return res.status(201).json({
      success: true,
      message: 'User updated successfully.',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'Something went wrong', data: null });
  }
};
