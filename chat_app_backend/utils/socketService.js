const socketio = require('socket.io');
const socketAuth = require('../middlewares/socketMiddleware');

let io;

const initialize = (server) => {
  io = socketio(server, {
    cors: {
      origin: "http://localhost:5173/" || "*",
      methods: ["GET", "POST"]
    }
  });

  // Authentication middleware
  io.use(socketAuth);

  io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected (User ID: ${socket.userId})`);

    // Join user's personal room
    if (socket.userId) {
      socket.join(socket.userId);
      console.log(`User ${socket.userId} joined their room`);
    }

    // Handle incoming messages
    socket.on('sendMessage', (messageData) => {
      // Broadcast to recipient
      io.to(messageData.receiverId).emit('receiveMessage', messageData);
      console.log(`Message sent from ${socket.userId} to ${messageData.receiverId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client ${socket.id} disconnected`);
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