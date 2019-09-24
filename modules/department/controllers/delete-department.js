const { Department } = require('mongoose').models;

/**
 * Function to delete department
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

    const department = await Department.findOne({ _id: departmentId }).select(
      '_id'
    );
    if (!department) {
      return res.status(400).json({
        success: false,
        message: 'Department to be deleted not found',
        data: null
      });
    }

    await Department.deleteOne({ _id: departmentId });

    return res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
