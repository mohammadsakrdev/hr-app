const Joi = require('../../../helpers/joi');
const { Benefit } = require('mongoose').models;

/**
 * Function to add new benefit
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
          description: Joi.string().required(),
          benefitType: Joi.string()
            .required()
            .valid(['Offer', 'Medical', 'News'])
        });

      const validation = Joi.validate(req.body, expectedBody);
      if (validation.error)
        return res
          .status(500)
          .json({ success: false, message: validation.error, data: null });
    }
    const { benefitId } = req.params;
    const { name, description, benefitType } = req.body;

    const [benefit, isBenefitNameUsed] = await Promise.all([
      Benefit.findOne({ _id: benefitId }).select('_id'),
      Benefit.findOne({ name }).select('_id')
    ]);
    if (!benefit) {
      return res.status(400).json({
        success: false,
        message: 'Benefit not found',
        data: null
      });
    }

    if (isBenefitNameUsed) {
      return res.status(400).json({
        success: false,
        message: 'Benefit Name used before',
        data: null
      });
    }

    await Benefit.updateOne(
      { _id: benefitId },
      { name, description, benefitType }
    );

    return res.status(200).json({
      success: true,
      message: 'Benefit updated successfully',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
