const mongoose = require('mongoose');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const { getIO, getReceiverSocketId } = require('../utils/socketService');



// Send message to user
const sendMessageToUser = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findById(sender);
    if (!existingUser) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const newChat = new Chat({ sender, receiver, message });
    await newChat.save();

    try {
      // Get IO instance only when needed
      const io = getIO();

      // Emit the new message to the room (chatId is newChat._id)
      io.to(getReceiverSocketId(receiver)).emit('newMessage', newChat);
      io.to(getReceiverSocketId(sender)).emit('newMessage', newChat);
      io.emit('messageDelivered', newChat);
    } catch (ioError) {
      console.warn('Socket.IO not available:', ioError.message);
      // Continue without WebSocket functionality
    }

    res.status(201).json({ message: 'Chat created successfully', data: newChat });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get all users
const getAllUsers = async (req, res) => {

  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ code: 400, data: [], message: 'Please provide the user ID' });
  }

  try {
    const users = await User.find({ _id: { $ne: _id } }).select('-password -token');

    return res.status(200).json({ code: 200, data: users, message: 'Users fetched successfully' });
  }
  catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ code: 500, data: [], message: 'Internal server error' });
  }
}

// Chats with user
const chatsWithUser = async (req, res) => {
  try {
    const { userId, isGroup } = req.body;

    const user = await User.findById(userId).select('-password -token');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let UserChat;

    if (isGroup === false && user) {
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
      return res.status(404).json({ message: 'Please provide required parameters', data: [] });
    }

    return res.status(200).json({ code: 200, data: UserChat, message: 'User fetched successfully' });
  }
  catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ code: 500, data: [], message: 'Internal server error' });
  }
}








module.exports = { sendMessageToUser, getAllUsers, chatsWithUser };