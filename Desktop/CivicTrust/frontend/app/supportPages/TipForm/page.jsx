"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Video, X } from "lucide-react";
import Footer from "@/app/HelpingComponents/Footer";

const TipForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    media: [],
    location: "",
  });

  const [mediaFiles, setMediaFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      // Append all text fields
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      // Append all media files (images/videos)
      mediaFiles.forEach((media) => {
        form.append("media", media.file); // "media" matches multer field
      });

      const token = sessionStorage.getItem("token");

      console.log("📤 Sending form data:", formData);
      console.log("📤 Media files count:", mediaFiles.length);

      const response = await fetch(
        "http://localhost:5001/api/anonymous/fileAnonymousTip",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Do not set Content-Type, browser does it for FormData
          },
          body: form,
        }
      );
      console.log(
        "this is the response received on tipform page after sending fetch request : ",
        response
      );
      // console.log(
      //   "this is the anonymous id i have received back : ",
      //   response.data.anonymousId
      // );
      // sessionStorage.setItem("anonymousId", response.data.anonymousId);

      const text = await response.text(); // Raw text
      console.log("🪵 Raw response text:", text);

      const data = JSON.parse(text); // Convert text to JSON to access anonymousId
      console.log("✅ Parsed data:", data);

      const anonymousId = data.anonymousId || data.tip?.anonymousId;
      console.log("🕵️ Anonymous ID:", anonymousId);

      sessionStorage.setItem("anonymousId", anonymousId);
      let result;
      try {
        result = JSON.parse(text); // Try to parse as JSON
      } catch (jsonError) {
        console.warn("⚠️ Response is not JSON, raw text:", text);
      }

      if (response.ok) {
        alert("✅ Report submitted successfully!");

        // Reset form fields
        setFormData({
          description: "",
          media: [],
          location: "",
        });

        setMediaFiles([]);
      } else {
        alert(result.message || "❌ Submission failed.");
        console.error("❌ Server response:", result);
      }
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("An error occurred while submitting the report.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            location: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          alert(
            "Unable to retrieve your location. Please enable location services."
          );
          console.error(error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 py-10 px-6">
        <Card className="max-w-4xl mx-auto bg-white border border-blue-500/30 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-blue-400">
              What happened
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={getLocation}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Use My Location
                </button>

                {/* Evidence Section */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Evidence
                  </label>
                  <textarea
                    name="evidence"
                    // value={formData.evidence}
                    onChange={handleChange}
                    placeholder="Describe the evidence collected..."
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <label className="flex-1">
                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer group">
                          <div className="text-center">
                            <Camera className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                            <span className="mt-2 block text-sm text-gray-400 group-hover:text-blue-500">
                              Upload Photos
                            </span>
                          </div>
                          <input
                            name="media"
                            type="file"
                            accept="image/*"
                            value={formData.media}
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </label>

                      <label className="flex-1">
                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 cursor-pointer group">
                          <div className="text-center">
                            <Video className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                            <span className="mt-2 block text-sm text-gray-400 group-hover:text-blue-500">
                              Upload Videos
                            </span>
                          </div>
                          <input
                            value={formData.media}
                            type="file"
                            accept="video/*"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </div>
                      </label>
                    </div>

                    {mediaFiles.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mediaFiles.map((file) => (
                          <div key={file.id} className="relative">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-700 rounded-lg overflow-hidden">
                              {file.type === "image" ? (
                                <img
                                  src={file.preview}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <video
                                  src={file.preview}
                                  className="w-full h-full object-cover"
                                  controls
                                />
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(file.id)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default TipForm;
