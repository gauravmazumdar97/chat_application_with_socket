const User = require('../models/userModel');
const {createToken, verifyToken} = require('../utils/helperFunction'); // Utility function to create JWT tokens

  


// Register a new user
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password, phoneno } = req.body;

    if (!fullname || !email || !phoneno|| !password) {
      return res.status(400).json({ code:400 ,message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ code:400 ,message: 'User already exists' });
    }

    const newUser = new User({ username: fullname , email, password, phoneno  });
    await newUser.save();

    return res.status(201).json({ code:201 ,message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ code:500 ,message: 'Internal server error' });
  }
};


// Logout the user
const logOutUser = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ code: 400, message: 'Please provide the user ID' });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ code: 404, message: 'User not found' });
    }

    // Example: Update a "loggedIn" status or token
    await User.updateOne({ _id }, { $set: { token: null } });

    return res.status(200).json({ code: 200, message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out user:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
  }
};



// Login the user
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
      user.token = createToken(
        {
          id: user._id,
          email: email,
          userdata: {
            "_id": user._id,
            "username": user.username,
            "email": user.email,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt,
            "__v": user.__v
          }
        }, process.env.JWT_SECRET, { expiresIn: '1h' });
          
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


  const forgotPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;

      // Validate email
      if (!email) {
        return res.status(400).json({ code: 400, message: 'Email is required' });
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ code: 404, message: 'Email not found. Please register.' });
      }

      await User.updateOne({ email }, { password: newPassword });

      return res.status(200).json({ code: 200, message: 'Password reset link sent to your email' });

    } catch (error) {
      console.error('Error in forgot password:', error);
      return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
  };




module.exports = { registerUser, loginUser, forgotPassword, logOutUser };