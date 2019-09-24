const { User } = require('mongoose').models;

module.exports = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId }).select('_id');
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User to be deleted not found',
        data: null
      });
    }

    await User.deleteOne({ _id: userId });

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: null
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: 'something went wrong', data: null });
  }
};