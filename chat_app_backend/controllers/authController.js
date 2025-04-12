const User = require('../models/userModel');
const {createToken} = require('../utils/helperFunction'); // Utility function to create JWT tokens

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // For sending emails




// Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ code:400 ,message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ code:400 ,message: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ code:201 ,message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ code:500 ,message: 'Internal server error' });
  }
};


// Log in a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({code:400, message: 'All fields are required' });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({code:404, message: 'User not found' });
    } else{
      user.token = createToken( { id: user._id, email: email }, 
          process.env.JWT_SECRET, { expiresIn: '1h' });
      await user.save();
    }

    if (!user || user.password !== password) {
      return res.status(401).json({code:401, message: 'Invalid email or password' });
    }

    return res.status(200).json({code:200, message: 'Login successful', user });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({code:500, message: 'Internal server error' });
  }
};


// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { userId, email } = req.body;

    if (!email) {
      return res.status(400).json({ code:400, message: 'Email is required' });
    }

    // Check if the user exists
    const user = await User.findOne({userId, email });
    if (!user) {
      return res.status(404).json({ code:404, message: 'Please register email not found' });
    }

    const updatedDetails= async (userId, newPassword) => {
      const user = await User.findById(userId);
      user.password = newPassword;
      await user.save();
      return user;
    }

    // Send the reset token via email
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail', // Use your email service provider
    //   auth: {
    //     user: process.env.EMAIL_USER, // Your email address
    //     pass: process.env.EMAIL_PASS, // Your email password
    //   },
    // });

    // const mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: 'Password Reset Request',
    //   text: `You requested a password reset. Use the following token to reset your password: ${resetToken}`,
    // };

    // await transporter.sendMail(mailOptions);

    return res.status(200).json({ code:200, message: 'Password has been reset', updatedDetails });
  } catch (error) {
    console.error('Error in forgot password:', error);
    return res.status(500).json({ code:500, message: 'Internal server error' });
  }
};





module.exports = { registerUser, loginUser, forgotPassword };