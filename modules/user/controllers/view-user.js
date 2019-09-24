const { User } = require('mongoose').models;
module.exports = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ _id: userId })
      .select('-password')
      .populate('department', '_id name location')
      .populate('manager', 'fullName email position')
      .sort('-createdAt')
      .lean();

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not exist',
        data: null
      });
    }

    return res.json({
      success: true,
      message: 'User found successfully.',
      data: user
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
