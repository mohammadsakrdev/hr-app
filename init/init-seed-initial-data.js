(async function() {
  const { User, Department } = require('mongoose').models;
  const bcrypt = require('bcrypt-nodejs');

  try {
    const user = await User.findOne({ role: 'HR' })
      .select('_id')
      .limit(1);
    if (!user) {
      const hr = new User({
        phoneNumber: '123456',
        email: 'hr@yahoo.com',
        fullName: 'hr',
        userName: 'hr',
        password: '123456',
        role: 'HR',
        position: 'HR Manger',
        salary: 15000,
        address: 'Cairo'
      });

      hr.password = bcrypt.hashSync(hr.password, bcrypt.genSaltSync(8), null);

      const dept = new Department({
        name: 'HR',
        location: 'Building A',
        manager: hr._id
      });

      hr.department = dept._id;

      await Promise.all([hr.save(), dept.save()]);
    }
  } catch (err) {
    console.log(err);
  }
})();
