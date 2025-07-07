'use client';
import { useEffect, useState, useRef } from 'react';
import { initSocket, getSocket } from '@/utils/socket';
import { MessageCircle, Send, User } from 'lucide-react';

const ROOMS = ['general', 'ask-a-cop', 'law-help', 'public-safety'];

export default function PublicChatRoom() {
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState('general');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const messagesEndRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  // Auto-scroll to bottom when messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection only once
  useEffect(() => {
    // Create a safety mechanism to prevent rendering before socket is ready
    try {
      const sock = initSocket();
      if (sock) {
        setSocket(sock);
        setIsConnected(true);
        
        // Clean up function
        return () => {
          if (sock) {
            sock.off('chatHistory');
            sock.off('newPublicMessage');
          }
        };
      }
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  }, []);

  // Set up event listeners and handle room changes AFTER socket is connected
  useEffect(() => {
    if (!socket || !isConnected) return;
    
    console.log("Setting up socket listeners");
    
    // Set up event listeners
    socket.on('chatHistory', (msgs) => {
      console.log("Received chat history:", msgs);
      setMessages(msgs);
    });

    socket.on('newPublicMessage', (msg) => {
      console.log("Received new message:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Join the room
    console.log("Joining room:", room);
    socket.emit('joinRoom', room);
    
    // Cleanup function for this effect only
    return () => {
      if (socket) {
        socket.off('chatHistory');
        socket.off('newPublicMessage');
      }
    };
  }, [socket, isConnected, room]);

  const handleSend = () => {
    if (!socket || !isConnected || !newMessage.trim()) return;
    
    const messageData = {
      room,
      username: username || 'Anonymous',
      text: newMessage.trim(),
    };
    
    console.log("Sending message:", messageData);
    socket.emit('publicMessage', messageData);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if message is from current user
  const isOwnMessage = (msg) => {
    return msg.username === (username || 'Anonymous');
  };

  return (
    <div className="p-4 max-w-full w-full mx-auto space-y-4 text-black bg-gradient-to-br from-blue-100 via-yellow-50 to-green-100 min-h-screen">
  <div className="flex items-center justify-between border-b border-blue-300 pb-4">
    <div className="flex items-center">
      <MessageCircle className="text-blue-600 mr-2" />
      <h1 className="text-3xl font-bold text-blue-800">Public Chat</h1>
    </div>
    <div className="text-sm text-green-700 font-semibold">
      {isConnected ? '🟢 Connected' : '🟡 Connecting...'}
    </div>
  </div>

  {!isConnected && (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md flex items-center">
      <div className="animate-pulse w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
      <p className="text-yellow-900">Establishing connection to chat server...</p>
    </div>
  )}

  <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2">
    {ROOMS.map((r) => (
      <button
        key={r}
        className={`px-4 py-2 rounded-full font-semibold transition-all duration-200 ${
          room === r
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
        }`}
        onClick={() => setRoom(r)}
        disabled={!isConnected}
      >
        #{r}
      </button>
    ))}
  </div>

  <div className="relative">
    <input
      placeholder="Your name (optional)"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full border border-blue-200 p-3 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
      disabled={!isConnected}
    />
    <User className="absolute left-3 top-3 text-blue-400" size={18} />
  </div>

  <div className="h-[28rem] overflow-y-auto border border-blue-200 rounded-xl bg-white/70 p-4 shadow-inner">
    {!isConnected ? (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
        <p>Connecting to chat server...</p>
      </div>
    ) : messages.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <MessageCircle size={32} className="mb-2 text-blue-400" />
        <p>No messages yet in #{room}.</p>
        <p className="text-sm mt-1">Be the first to start the conversation!</p>
      </div>
    ) : (
      <div className="space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${isOwnMessage(msg) ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl ${
                isOwnMessage(msg)
                  ? 'bg-blue-600 text-white shadow-lg rounded-br-none'
                  : 'bg-gray-100 text-gray-700 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className={`font-medium text-sm ${isOwnMessage(msg) ? 'text-white' : 'text-blue-600'}`}>
                  {msg.username}
                </span>
                <span className={`text-xs ${isOwnMessage(msg) ? 'text-white' : 'text-gray-500'}`}>
                  {formatTime(msg.createdAt)}
                </span>
              </div>
              <p className="text-sm break-words">{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
    )}
    <div ref={messagesEndRef} />
  </div>

  <div className="flex space-x-2 relative">
    <input
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      placeholder={`Message #${room}...`}
      className="flex-1 border border-blue-200 p-3 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
      disabled={!isConnected}
    />
    <button
      onClick={handleSend}
      className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center rounded-r-lg ${
        isConnected && newMessage.trim()
          ? 'text-blue-600 hover:bg-blue-50'
          : 'text-gray-400 cursor-not-allowed'
      }`}
      disabled={!isConnected || !newMessage.trim()}
    >
      <Send size={18} className={isConnected && newMessage.trim() ? "text-blue-600" : "text-gray-400"} />
    </button>
  </div>
</div>


  )

  
  
}