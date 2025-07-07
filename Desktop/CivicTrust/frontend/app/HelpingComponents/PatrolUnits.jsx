"use client";
import React, { useState, useEffect } from "react";
import { MapPin, ArrowLeft } from "lucide-react";

const PatrolUnits = () => {
  const [patrolUnits, setPatrolUnits] = useState([]);

  useEffect(() => {
    const fetchPatrolUnits = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/users/getPolice");
        const data = await res.json();
        console.log("yes we got a response : ", data);
        setPatrolUnits(data);
      } catch (err) {
        console.error("Failed to load patrol units", err);
      }
    };

    fetchPatrolUnits();
  }, []);

  

  return (
    <div>
        
      <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
        
        <h2 className="text-xl font-semibold text-white mb-4">Patrol Units</h2>
        <div className="space-y-4">
          {patrolUnits.map((unit) => (
            <div key={unit._id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium">{unit.name}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    unit.status === "On Patrol"
                      ? "bg-green-500/20 text-green-200"
                      : unit.status === "Responding"
                      ? "bg-red-500/20 text-red-200"
                      : "bg-blue-500/20 text-blue-200"
                  }`}
                >
                  {unit.badgeNumber}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2 text-sm text-blue-200">
                <MapPin className="h-4 w-4" />
                <span>{unit.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatrolUnits;
