const socketio = require('socket.io');
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