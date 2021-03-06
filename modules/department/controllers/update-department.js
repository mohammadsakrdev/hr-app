const Joi = require('../../../helpers/joi');
const { Department, User } = require('mongoose').models;

/**
 * Function to add new department
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
          name: Joi.string().required(),
          location: Joi.string().required(),
          manager: Joi.mongoId().required()
        });

      const validation = Joi.validate(req.body, expectedBody);
      if (validation.error)
        return res
          .status(500)
          .json({ success: false, message: validation.error, data: null });
    }
    const { departmentId } = req.params;
    const { name, location, manager } = req.body;

    const [
      isManagerExist,
      department,
      isDepartmentNameUsed
    ] = await Promise.all([
      User.findOne({ _id: manager }).select('_id'),
      Department.findOne({ _id: departmentId }).select('_id'),
      Department.findOne({ name }).select('_id')
    ]);
    if (!department) {
      return res.status(400).json({
        success: false,
        message: 'Department not found',
        data: null
      });
    }

    if (isDepartmentNameUsed) {
      return res.status(400).json({
        success: false,
        message: 'Department Name used before',
        data: null
      });
    }

    if (!isManagerExist) {
      return res.status(400).json({
        success: false,
        message: 'Manager not found'
      });
    }
    await Department.updateOne(
      { _id: departmentId },
      { name, location, manager }
    );

    return res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
