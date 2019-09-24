const { Benefit } = require('mongoose').models;

/**
 * Function to delete benefit
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

    const benefit = await Benefit.findOne({ _id: benefitId }).select('_id');
    if (!benefit) {
      return res.status(400).json({
        success: false,
        message: 'Benefit to be deleted not found',
        data: null
      });
    }

    await Benefit.deleteOne({ _id: benefitId });

    return res.status(200).json({
      success: true,
      message: 'Benefit deleted successfully',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
