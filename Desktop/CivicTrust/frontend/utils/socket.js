// utils/socket.js
import { io } from 'socket.io-client';

let socket = null;

export const initSocket = () => {
  if (!socket) {
    try {
      // Use environment variables for the URL, fallback to localhost
      const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      console.log(`Initializing socket connection to ${socketUrl}`);
      
      socket = io(socketUrl, {
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 20000
      });
      
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });
      
      socket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
      });
      
      socket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
      });
    } catch (error) {
      console.error("Socket initialization failed:", error);
      return null;
    }
  }
  
  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket disconnected and reset');
  }
};