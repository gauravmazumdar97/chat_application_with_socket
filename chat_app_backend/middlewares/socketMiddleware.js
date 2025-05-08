const {createToken, verifyToken} = require('../utils/helperFunction');

const socketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      throw new Error('Authentication error: No token provided');
    }

    const decoded = verifyToken(token, process.env.JWT_SECRET);
    socket.userId = decoded.id; // Attach user ID to socket
    
    next();
  } catch (error) {
    console.error('Socket authentication error:', error.message);
    next(new Error('Authentication failed'));
  }
};

module.exports = socketAuth;