const { User } = require('mongoose').models;
module.exports = async (req, res) => {
  try {
    const current = await User.findOne({
      _id: req.user._id
    })
      .populate('department', '_id name location')
      .lean();

    if (!current) {
      return res.status(400).json({
        success: false,
        message: 'Profile for user not exist',
        data: null
      });
    }

    return res.json({
      success: true,
      message: 'Profile for user found successfully.',
      data: current
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
