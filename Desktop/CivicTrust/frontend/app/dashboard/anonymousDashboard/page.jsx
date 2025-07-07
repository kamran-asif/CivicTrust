"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  Shield,
  ArrowLeft,
  AlertCircle,
  Lock,
  Info,
  MessageSquare,
} from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "components/ui/button";
import CameraCapture from "@/app/HelpingComponents/CameraCapture";
import UploadEvidence from "@/app/HelpingComponents/UploadEvidence";
import TrackTips from "@/app/HelpingComponents/TrackTips";
import Link from "next/link";
import MapStations from "@/app/HelpingComponents/MapStations";

const AnonymousDashboard = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const [location, setLocation] = useState(null);
  const [policeStations, setPoliceStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Get the user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // Fetch nearby police stations (This would normally be a call to an API)
  useEffect(() => {
    if (location) {
      // Simulated data - replace with actual API call
      setPoliceStations([
        {
          name: "Police Station 1",
          lat: location.lat + 0.01,
          lng: location.lng + 0.01,
          distance: "1.2 km",
        },
        {
          name: "Police Station 2",
          lat: location.lat + 0.02,
          lng: location.lng - 0.02,
          distance: "2.5 km",
        },
        // More stations...
      ]);
    }
  }, [location]);

  // Camera handling functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert(
        "Unable to access camera. Please ensure you have granted camera permissions."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const privacyTips = [
    "Never include your personal information in tips",
    "No personal data is stored",
    "We will update your tip status",
  ];

  const recentUpdates = [
    {
      id: "T-7842",
      status: "Under Review",
      message: "Tip is being evaluated by authorities",
      time: "2 hours ago",
    },
    {
      id: "T-7839",
      status: "Action Taken",
      message: "Law enforcement has acted on the provided information",
      time: "1 day ago",
    },
  ];

  const nearbyResources = [
    {
      type: "Station",
      name: "Central Police Station",
      distance: "1.2 km",
      officers: 5,
    },
    { type: "Patrol", name: "Mobile Unit 7", distance: "0.8 km", officers: 2 },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [
      ...prev,
      ...files.map((file) => ({
        name: file.name,
        type: file.type.includes("image") ? "image" : "video",
        size: (file.size / 1024 / 1024).toFixed(2),
      })),
    ]);
  };

  const removeFile = (fileName) => {
    setSelectedFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900">
      <nav className="bg-gray-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-10">
  <div className="relative max-w-7xl mx-auto px-4 py-4 flex items-center justify-center">
    
    {/* Back Button on the Left */}
    <div className="absolute left-4 flex items-center space-x-2">
      <Link href="/" className="flex items-center space-x-2">
        <ArrowLeft className="h-5 w-5 text-blue-400" />
        <span className="text-blue-400">Back to Home</span>
      </Link>
    </div>

    {/* Centered Title */}
    <div className="flex items-center space-x-2">
      <Eye className="text-blue-400 h-8 w-8" />
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
        Anonymous Portal
      </span>
    </div>

    {/* Right Side Secure Info */}
    <div className="absolute right-4 flex items-center space-x-2">
      <Lock className="h-6 w-6 text-blue-300" />
      <span className="text-sm text-blue-300">Secure Connection</span>
    </div>

  </div>
</nav>


      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Privacy Notice */}
        <div className="bg-red-500/10 border border-red-400/20 rounded-xl p-4 text-red-200">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span className="font-semibold">
              Important: People filing false tips will have action taken against them.
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Submit Tip Card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 w-full max-w-md text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white/10 p-3 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Submit Anonymous Tip</h2>
                <p className="text-blue-100">Share information securely</p>

                <Link href="/supportPages/TipForm">
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-semibold transition-colors">
                    New Submission
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Track Tip Card */}
          <TrackTips />
        </div>

        {/* Main Content - Modified Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Privacy Guidelines - Now takes 3 columns */}
          <div className="col-span-12 md:col-span-3">
            <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-white border border-blue-400/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-white/10 p-3 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Privacy Guidelines</h2>
              </div>
              <div className="space-y-4">
                {privacyTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Info className="h-5 w-5 text-blue-300 flex-shrink-0 mt-0.5" />
                    <span className="text-blue-100">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MapStations - Now takes 9 columns */}
          <div className="col-span-12 md:col-span-9">
            <MapStations />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousDashboard;
