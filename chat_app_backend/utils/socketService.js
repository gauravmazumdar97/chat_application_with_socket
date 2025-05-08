const socketio = require('socket.io');
const mongoose = require('mongoose');
const socketAuth = require('../middlewares/socketMiddleware');

let io;

const initialize = (server) => {
  io = socketio(server, {
    cors: {
      origin: "http://localhost:5173/home" || "http.e;litemindz.co" || "https://e.litemindz.co",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

// Authentication middleware
io.use(socketAuth);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected (User ID: ${socket.userId})`);

  // Join user to their personal room for direct messaging
  socket.join(`user_${socket.userId}`);

  // Handle joining chat rooms
  socket.on('joinChat', (chatId) => {
    socket.join(`chat_${chatId}`);
    console.log(`User ${socket.userId} joined chat ${chatId}`);
  });

  // Handle leaving chat rooms
  socket.on('leaveChat', (chatId) => {
    socket.leave(`chat_${chatId}`);
    console.log(`User ${socket.userId} left chat ${chatId}`);
  });

  // Handle incoming messages
  socket.on('sendMessage', async (messageData) => {
    try {
      console.log(`New message from ${socket.userId} to chat ${messageData.chatId}`);

      // Validate message data
      if (!messageData.chatId || !messageData.message) {
        throw new Error('Invalid message data');
      }

      // Here you would typically save to database
      const savedMessage = {
        _id: new mongoose.Types.ObjectId(),
        chat: messageData.chatId,
        sender: socket.userId,
        message: messageData.message,
        createdAt: new Date()
      };

      // Broadcast to all in the chat room except sender
      socket.to(`chat_${messageData.chatId}`).emit('newMessage', savedMessage);
      
      // Send back to sender for confirmation
      socket.emit('messageDelivered', savedMessage);

    } catch (error) {
      console.error('Error handling message:', error);
      socket.emit('messageError', {
        error: error.message,
        originalMessage: messageData
      });
    }
  });

  // Typing indicators
  socket.on('typing', ({ chatId, isTyping }) => {
    socket.to(`chat_${chatId}`).emit('typing', {
      userId: socket.userId,
      isTyping
    });
  });

  // Presence tracking
  socket.on('updatePresence', (status) => {
    // Broadcast to relevant users (friends, chat participants)
    // You would implement your own logic here
  });

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected (User ID: ${socket.userId})`);
    
    // You might want to update user's presence status here
    // io.emit('userOffline', { userId: socket.userId });
  });
});

   
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

module.exports = { initialize, getIO };