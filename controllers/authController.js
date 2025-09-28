const bcrypt = require('bcryptjs'); // ✅ Use bcryptjs for Railway compatibility
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, pan } = req.body;
    const kycImage = req.file?.path;

    // Validate input
    if (!name || !email || !password || !pan || !kycImage) {
      return res.status(400).json({ error: 'All fields including image are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      pan,
      kycImage
    });

    res.status(201).json({ message: 'Signup successful', userId: user.id });
  } catch (err) {
    console.error('Signup error:', err.message);
    res.status(500).json({ error: 'Signup failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ error: 'Login failed' });
  }
};
