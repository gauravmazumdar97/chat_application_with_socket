const mongoose = require('mongoose');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');

// Create a new user
const createUser = async (req, res) => {

    console.log("===========>>>");
    
  try {
    const { username, email, password } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {

  try {
    const users = await User.find().select('-password -token');
    return res.status(200).json({code: 200, data: users, message: 'Users fetched successfully'});
  }
  catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({code: 500, data:[], message: 'Internal server error' });
  }
}

// Chats with user
const chatsWithUser = async (req, res) => {
  try {
    const { userId, isGroup } = req.params;

    const user = await User.findById(userId).select('-password -token');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    let UserChat;
    if (isGroup === 'false' && user) {
      UserChat = await Chat.find({
        $or: [
          { "sender": new mongoose.Types.ObjectId(userId) },
          { "receiver": new mongoose.Types.ObjectId(userId) }
        ]
      })
      .populate('sender', '-password -token')
      .populate('receiver', '-password -token');

      if (!UserChat) {
        return res.status(404).json({ message: 'User chat not found', data: [] });
      }
      
    } else {
      return res.status(404).json({ message: 'Please provide required parameters',data: [] });
    }   

    return res.status(200).json({code: 200, data: UserChat, message: 'User fetched successfully'});
  }
  catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({code: 500, data:[], message: 'Internal server error' });
  }
}








module.exports = { createUser, getAllUsers, chatsWithUser };