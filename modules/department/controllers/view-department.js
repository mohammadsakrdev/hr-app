const { Department } = require('mongoose').models;

/**
 * Function to view department
 * @function
 *
 * @param {Object} req The express request
 * @param {Object} res The express response
 * @param {Function} next - The express next middleware function
 * @return {Object}
 */
module.exports = async (req, res, next) => {
  try {
    const { departmentId } = req.params;
    const department = await Department.findOne({ _id: departmentId })
      .populate(
        'manager',
        '_id userName fullName email role position address phoneNumber'
      )
      .lean();

    if (!department) {
      return res.status(400).json({
        success: false,
        message: 'Department not exist',
        data: null
      });
    }

    return res.json({
      success: true,
      message: 'Department found successfully.',
      data: department
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
