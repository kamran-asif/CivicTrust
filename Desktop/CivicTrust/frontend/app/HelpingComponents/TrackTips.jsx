'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      const anonymousId = sessionStorage.getItem('anonymousId');
      // console.log("this is the anonymousid i have gotten from sessionstorage : ", anonymousId);
      

      if (!anonymousId) {
        console.warn('No anonymousId found in sessionStorage');
        setTips([]);
        setLoading(false);
        return;
      }

      try {
        
        const response = await axios.get(
          `http://localhost:5001/api/anonymous/tips/track/${anonymousId}`
        );
        setTips(response.data.tips || []);
      } catch (error) {
        console.error('Error fetching anonymous tips:', error);
        setTips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">Track Tip Status</h2>
      <p className="text-blue-100 mb-4">View the status of your submitted tips</p>

      <div className="space-y-3">
        {loading ? (
          <p className="text-blue-200">Loading tips...</p>
        ) : tips.length > 0 ? (
          tips.map((tip) => (
            <div
              key={tip._id}
              className="bg-white/10 p-3 rounded-lg flex justify-between items-center"
            >
              <span className="text-white">{tip.description}</span>
              <span
                className={`px-2 py-1 rounded-lg text-sm font-semibold ${
                  tip.status === 'Reviewed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
              >
                {tip.status}
              </span>
            </div>
          ))
        ) : (
          <p className="text-blue-200">No tips found.</p>
        )}
      </div>
    </div>
  );
};

export default TrackTips;
