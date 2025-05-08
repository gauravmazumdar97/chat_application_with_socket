import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(token) {
    if (this.socket) return;

    this.socket = io(process.env.serverUrl, {
      auth: { token },
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  sendMessage(messageData) {
    if (this.socket) {
      this.socket.emit('sendMessage', messageData);
    }
  }

  subscribeToMessages(callback) {
    if (this.socket) {
      this.socket.on('receiveMessage', callback);
    }
  }

  unsubscribeFromMessages(callback) {
    if (this.socket) {
      this.socket.off('receiveMessage', callback);
    }
  }
}

const socketService = new SocketService();
export default socketService;