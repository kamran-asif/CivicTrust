// utils/socket.js
import { io } from 'socket.io-client';

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000', {
      transports: ['websocket'],
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};