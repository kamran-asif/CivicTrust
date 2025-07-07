"use client";

import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Camera, Video, VideoOff, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const CameraCapture = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Start recording
  const handleStartRecording = useCallback(() => {
    if (webcamRef.current) {
      recordedChunksRef.current = [];
      const stream = webcamRef.current.stream;
      const mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
        setVideoUrl(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
    }
  }, []);

  // Stop recording
  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording]);

  // Upload Video
  const handleUpload = async () => {
    if (!videoUrl) return;
    setIsUploading(true);

    // Simulating an upload process
    setTimeout(() => {
      alert("Video uploaded successfully!");
      setIsUploading(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-white border border-blue-400/20">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-white/10 p-3 rounded-lg">
          <Camera className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold">Camera Capture Evidence</h2>
      </div>

      {/* Camera Section */}
      <div className="flex flex-col items-center space-y-4">
        {isCameraActive ? (
          <>
            <Webcam
              ref={webcamRef}
              onUserMedia={() => setIsCameraActive(true)}
              onUserMediaError={() => setIsCameraActive(false)}
              mirrored={true}
              style={{ height: 300, width: 300, borderRadius: "8px" }}
            />

            {/* Recording Buttons */}
            <div className="flex space-x-3">
              {!isRecording ? (
                <Button className="bg-red-600 hover:bg-red-700" onClick={handleStartRecording}>
                  <Video className="h-5 w-5 mr-2" /> Start Recording
                </Button>
              ) : (
                <Button className="bg-gray-600 hover:bg-gray-700" onClick={handleStopRecording}>
                  <VideoOff className="h-5 w-5 mr-2" /> Stop Recording
                </Button>
              )}
            </div>
          </>
        ) : (
          <Button className="w-full bg-transparent hover:bg-slate-700" onClick={() => setIsCameraActive(true)}>
            Enable Camera
          </Button>
        )}

        {/* Show Recorded Video */}
        {videoUrl && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Recorded Video:</h3>
            <video controls src={videoUrl} className="w-full max-w-md rounded-lg border" />

            {/* Upload Button */}
            <Button 
              className="mt-3 bg-blue-500 hover:bg-blue-600 w-full flex items-center justify-center" 
              onClick={handleUpload} 
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : (<><Upload className="h-5 w-5 mr-2" /> Upload Video</>)}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;
