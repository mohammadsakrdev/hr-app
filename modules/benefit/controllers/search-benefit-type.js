const { Benefit } = require('mongoose').models;

/**
 * Function to search benefit by type
 * @function
 *
 * @param {Object} req The express request
 * @param {Object} res The express response
 * @param {Function} next - The express next middleware function
 * @return {Object}
 */
module.exports = async (req, res, next) => {
  try {
    const { benefitType } = req.params;
    const benefits = await Benefit.find({ benefitType })
      .sort('-createdAt')
      .lean();

    if (!benefits.length) {
      return res.status(400).json({
        success: false,
        message: 'Benefits not exist',
        data: null
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Benefits found successfully.',
      data: benefits
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
