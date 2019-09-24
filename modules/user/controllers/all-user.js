const { User } = require('mongoose').models;
module.exports = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .populate('department', '_id name location')
      .populate('manager', 'fullName email position')
      .sort('-createdAt')
      .lean();

    if (!users.length) {
      return res
        .status(400)
        .json({ success: true, message: 'Users not exist', data: null });
    }

    return res.json({
      success: true,
      message: 'Users found successfully.',
      data: users
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};
