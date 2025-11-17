const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/User');
const { connectDB, disconnectDB } = require('../src/config/database');

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('✅ Connected to MongoDB');

    const email = 'admin@test.com';
    const password = 'admin123';

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('⚠️ Admin already exists:');
      console.log('   Email:', existing.email);
      console.log('   Role:', existing.role);
      await disconnectDB();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin user
    const admin = await User.create({
      email,
      passwordHash: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin account created successfully!');
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   ID:', admin._id);
    console.log('\nYou can now login with:');
    console.log('   Email: admin@test.com');
    console.log('   Password: admin123');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    await disconnectDB();
    process.exit(1);
  }
};

createAdmin();
