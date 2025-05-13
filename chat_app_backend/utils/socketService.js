const socketio = require('socket.io');
const mongoose = require('mongoose');
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
    console.log(`Client connected: ${socket.id} (User ID: ${socket.userId})`);
    
    // Store user socket connection
    if (socket.userId) {
      users[socket.userId] = socket.id;
      io.emit('getOnlineUsers', Object.keys(users));
      // Broadcast to chat room
      socket.to(socket.userId).emit('getOnlineUsers',  Object.keys(users));
      // socket.to(socket.id).emit('getOnlineUsers',  Object.keys(users));
    }

    // Handle joining chat rooms
    socket.on('joinChat', (chatId) => {
      console.log(`User ${socket.userId} joined chat ${chatId}`);
      socket.join(`chat_${chatId}`);
    });

    // Handle leaving chat rooms
    socket.on('leaveChat', (chatId) => {
      socket.leave(`chat_${chatId}`);
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
          chat: messageData.chatId,
          sender: socket.userId,
          receiver: messageData.sender,
          message: messageData.message,
          createdAt: new Date()
        };
console.log("========>>");
console.log(savedMessage);
console.log("========>>");

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

    // Typing indicators
    socket.on('typing', ({ chatId, isTyping, sender }) => {
      console.log("=======>>>>");
      console.log({
        "chatId": chatId,
        "isTyping": isTyping,
        "sender": sender,
      });
      
      const receiverSocketId = getReceiverSocketId(sender);
      console.log("=======>>>>",receiverSocketId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('typing', {
          chatId, userId: socket.userId, isTyping
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id} (User ID: ${socket.userId})`);
      
      // Remove user from online list
      if (socket.userId) {
        delete users[socket.userId];
        io.emit('getOnlineUsers', Object.keys(users));
      }
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