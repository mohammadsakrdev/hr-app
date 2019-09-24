const { Benefit } = require('mongoose').models;

/**
 * Function to view benefit
 * @function
 *
 * @param {Object} req The express request
 * @param {Object} res The express response
 * @param {Function} next - The express next middleware function
 * @return {Object}
 */
module.exports = async (req, res, next) => {
  try {
    const { benefitId } = req.params;
    const benefit = await Benefit.findOne({ _id: benefitId }).lean();

    if (!benefit) {
      return res.status(400).json({
        success: false,
        message: 'Benefit not exist',
        data: null
      });
    }

    return res.json({
      success: true,
      message: 'Benefit found successfully.',
      data: benefit
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
