'use client'
import React, { useState } from 'react';
import { Upload, Image, Video, X } from "lucide-react";

const UploadEvidence = () => {

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
    
        const newFiles = files.map((file) => ({
          id: Math.random().toString(36).substr(2, 9),
          file,
          type: file.type.startsWith("image/") ? "image" : "video",
          preview: URL.createObjectURL(file),
        }));
    
        setMediaFiles((prev) => [...prev, ...newFiles]);
      };
    
      const removeFile = (fileId) => {
        setMediaFiles(mediaFiles.filter((file) => file.id !== fileId));
      };

    return (
        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 text-white border border-blue-400/20">
            <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-xl font-semibold">Upload Evidence</h2>
            </div>

            <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-white/40 transition-colors">
                <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-8 w-8 text-blue-200" />
                        <span className="text-blue-100">Drop files or click to upload</span>
                        <span className="text-sm text-blue-200">Images and videos accepted</span>
                    </div>
                </label>
            </div>

            {selectedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {selectedFiles.map((file) => (
                        <div
                            key={file.name}
                            className="flex items-center justify-between bg-white/10 p-2 rounded-lg"
                        >
                            <div className="flex items-center space-x-2">
                                {file.type.startsWith("image") ? (
                                    <Image className="h-4 w-4" />
                                ) : (
                                    <Video className="h-4 w-4" />
                                )}
                                <span className="text-sm truncate">{file.name}</span>
                                <span className="text-xs text-blue-200">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </span>
                            </div>
                            <button
                                onClick={() => removeFile(file.name)}
                                className="text-blue-200 hover:text-white"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            {selectedFiles.length > 0 && (
                <button
                    onClick={handleFileUpload}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
                    // disabled={uploading}
                >
                    {/* {uploading ? "Uploading..." : "Upload Files"} */}
                </button>
            )}
        </div>
    );
};

export default UploadEvidence;
