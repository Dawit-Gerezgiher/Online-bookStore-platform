const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('Admin123', 10);
      const admin = new User({
        name: 'Admin User',
        email: 'admin@gmail.com',
        passwordHash,
        role: 'admin'
      });
      await admin.save();
      console.log('Default admin created: admin@gmail.com / Admin123');
    }
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
}

module.exports = seedAdmin;