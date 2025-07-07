'use client'
import { Shield, Users, Newspaper, ChevronRight, Bot, ArrowLeft, Bell, Search, MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import PublicChatSection from '@/app/HelpingComponents/PublicChatSection';

import FaqSection from '@/app/HelpingComponents/FaqSection';
import MapStations from '@/app/HelpingComponents/MapStations';

export default function CommunityDashboard() {
  const [activeSection, setActiveSection] = useState('chatbot');
  
  const menuItems = [
    { id: 'FAQ', label: 'Navigating CivicTrust', icon: Bot, description: 'Get answers to your questions' },
    { id: 'PublicChatMessage', label: 'Public Chat', icon: Users, description: 'Share your thoughts with the community' },
    { id: 'Map', label: 'Stations near you', icon: MapIcon, description: 'Find your nearest station' },
    
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'FAQ':
        return <FaqSection />;
      case 'PublicChatMessage':
        return <PublicChatSection />;
      case 'Map':
        return <MapStations />;
      default:
        return <FaqSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-900/60 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-blue-400" />
                <span className="text-blue-400">Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="text-blue-400 h-7 w-7" />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
                CivicTrust Community
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-blue-300 hover:text-blue-100 cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 flex items-center justify-center">
                <span className="font-bold">U</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-64 bg-gray-900/40 backdrop-blur-sm border-r border-blue-500/20 p-4 flex flex-col"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
              Community Hub
            </h2>
            <p className="text-blue-200 text-sm">Find help and connect with others</p>
          </div>
          
          {/* Menu Options */}
          <div className="space-y-2 flex-grow">
            {menuItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full p-3 rounded-lg flex items-center space-x-3 transition-all ${
                  activeSection === item.id 
                  ? 'bg-blue-600/30 border border-blue-500/40' 
                  : 'hover:bg-blue-800/20'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeSection === item.id ? 'bg-blue-500/20' : 'bg-gray-800/50'}`}>
                  <item.icon className="h-5 w-5 text-blue-300" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-blue-300">{item.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Help Link */}
          <div className="mt-4 pt-4 border-t border-blue-500/20">
            <Link href="/help" className="flex items-center space-x-2 text-blue-300 hover:text-blue-100 transition-colors group">
              <span>Need more help?</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-grow p-6 overflow-y-auto"
        >
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
}