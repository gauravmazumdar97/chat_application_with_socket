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

    console.log("users======>>",users);
    
    return users[receiverId];
  };

  // Authentication middleware
  io.use(socketAuth);

  // io.use((socket, next) => {
  //   const userId = socket.handshake.auth.userId;
  //   if (!userId) return next(new Error("Missing userId"));
  //   socket.userId = userId;
  //   next();
  // });

  io.on('connection', (socket) => {
    
    const userId = socket.userId; // Make sure this was set using io.use middleware
    console.log(`Client connected: ${socket.id} (User ID: ${userId})`);

    // Store user socket connection
    if (userId) {
      users[userId] = socket.id;
    }
      // ✅ Notify all users about updated online users
      io.emit('getOnlineUsers', Object.keys(users));

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

    socket.on('typing', ({ chatId, isTyping, sender }) => {
      console.log("Typing event received:", { chatId, isTyping, sender });
    
      // Find the receiver's socket ID (not the sender)
      const receiverSocketId = getReceiverSocketId(chatId);
      console.log("This is the socketID of the recver of typing ", receiverSocketId);
      
      if (receiverSocketId) {
        // Only emit to the receiver (not the sender)
        io.to(receiverSocketId).emit('typing', {
          chatId,
          userId: sender,
          isTyping
        });
      }
    });
    
    // socket.on('typing', ({ chatId, isTyping, sender }) => {
    //   console.log("=======>>>>");
    //   console.log({
    //     "chatId": chatId,
    //     "isTyping": isTyping,
    //     "sender": sender,
    //   });
      
    //   const receiverSocketId = getReceiverSocketId(chatId);
    //   console.log("=======>>>>",receiverSocketId);

    //   if (receiverSocketId) {
    //     io.to(receiverSocketId).emit('typing', {
    //       chatId, userId: socket.userId, isTyping
    //     });
    //   }
    // });
// ==============WORKING TYPING FOR ALL USERS CAN BE USED IN GROUP CODE
    // socket.on('typing', ({ chatId, isTyping, sender }) => {
    //   console.log("Typing event received:", { chatId, isTyping, sender });
      
    //   // Broadcast to all participants in the chat
    //   io.to(`chat_${chatId}`).emit('typing', {
    //     chatId,
    //     userId: sender,
    //     isTyping
    //   });
    // });


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