const mongoose = require('mongoose');
const socketio = require('socket.io');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');
const socketAuth = require('../middlewares/socketMiddleware');


let io;
const users = {}; // Track online users

const initialize = (server) => {
  io = socketio(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://elitemindz.co",
        "https://elitemindz.co"
      ],
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Utility function to get receiver's socket ID
  const getReceiverSocketId = (receiverId) => {

    return users[receiverId];
  };

  // Authentication middleware
  io.use(socketAuth);

  io.on('connection', (socket) => {
    const userId = socket.userId; 

    // Store user socket connection
    if (userId) {
      users[userId] = socket.id;
    }
    console.log(`Client connected: ${socket.id} (User ID: ${userId})`);


    // Notify all users about updated online users
    io.emit('getOnlineUsers', Object.keys(users));

    // Handle joining chat rooms
    socket.on('joinChat', (chatId) => {
      socket.join(`chat_${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on('leaveChat', (chatId) => {
      console.log(`User ${socket.userId} left chat ${chatId}`);
    });

    // Handle incoming messages
    socket.on('sendMessage', async (messageData) => {
      try {
        if (!messageData.chatId || !messageData.message || !messageData.sender) {
          throw new Error('Invalid message data');
        }

        // Create message object
        const savedMessage = {
          _id: new mongoose.Types.ObjectId(),
          chat: getReceiverSocketId(messageData.chatId),
          sender: messageData.sender,
          receiver: messageData.receiver,
          message: messageData.message,
          messageDelivered: messageData.messageDelivered,
          messageSeen: messageData.messageSeen,
          createdAt: new Date()
        };

        // Broadcast to chat room
        socket.to(`chat_${messageData.chatId}`).emit('newMessage', savedMessage);

        // Send to specific receiver if they're online
        const receiverSocketId = getReceiverSocketId(messageData.sender);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', savedMessage);
        }

        // Send message back to sender (confirmation + message display)
        socket.emit('newMessage', savedMessage);

      } catch (error) {
        console.error('Error handling message:', error);
        socket.emit('messageError', {
          error: error.message,
          originalMessage: messageData
        });
      }
    });

// Handle message seen for the room
socket.on('msg_seen', async (msg_seen) => {
  try {
    const { LoginUser, SelectedUser } = msg_seen;

    console.log(`LoginUser: ${LoginUser}, SelectedUser: ${SelectedUser}`);

    if (!LoginUser || !SelectedUser) {
      return socket.emit('error', { code: 400, message: 'Please provide both user IDs.' });
    }

    const user = await User.findOne({ _id: LoginUser });

    if (user) {
      await Chat.updateMany(
        { sender: LoginUser, receiver: SelectedUser },
        {
          $set: {
            messageDelivered: 'Delivered',
            messageSeen: 'Read',
          },
        }
      );

      // Optionally notify client of success
      socket.emit('msg_seen_success', {
        code: 200,
        message: 'Messages marked as seen.',
      });
    } else {
      socket.emit('error', { code: 404, message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating message status:', error);
    socket.emit('error', { code: 500, message: 'Internal server error.' });
  }
});


    socket.on('typing', ({ chatId, isTyping, sender, reciever }) => {
      // Find the receiver's socket ID (not the sender)
      const receiverSocketId = getReceiverSocketId(chatId);

      if (receiverSocketId) {
        // Only emit to the receiver (not the sender)
        io.to(receiverSocketId).emit('typing', { chatId, sender, isTyping, reciever });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id} (User ID: ${socket.userId})`);
      delete users[socket.userId];
      io.emit('getOnlineUsers', Object.keys(users));
    });
  });
};

const getIO = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};

const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};





module.exports = { initialize, getIO, getReceiverSocketId };