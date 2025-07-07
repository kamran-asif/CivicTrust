import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/chatbot/chatResponse',
        destination: 'http://localhost:5001/api/chatbot/chatResponse', // Your Express backend endpoint
      },
    ];
  },
};

export default nextConfig;
