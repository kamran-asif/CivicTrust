"use client";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Video, X } from "lucide-react";
import Footer from "@/app/HelpingComponents/Footer";

const PoliceReportForm = () => {
  const [formData, setFormData] = useState({
    caseNumber: "",
    reportingOfficer: "",
    badgeNumber: "",
    dateTime: "",
    location: "",
    incidentType: "",
    victimName: "",
    victimContactInfo: "",
    description: "",
    additionalInfo: "",
    media: [],
    status: "Open",
    priority: "Medium",
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

      const response = await fetch("http://localhost:5001/api/cases/fileCase", {
        method: "POST", 
        headers: {
          Authorization: `Bearer ${token}`, // Do not set Content-Type, browser does it for FormData
        },
        body: form,
      });

      
      // const text = await response.text();
      // console.error("🪵 Raw response text:", text);
      // const result = await response.json();

      const text = await response.text(); // Read response as text
      console.log("🪵 Raw response text:", text);
  
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
          caseNumber: "",
          reportingOfficer: "",
          badgeNumber: "",
          dateTime: "",
          location: "",
          incidentType: "",
          victimName: "",
          victimContactInfo: "",
          description: "",
          additionalInfo: "",
          media: "",
          status: "Open",
          priority: "Medium",
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 py-10 px-6">
        <Card className="max-w-4xl mx-auto bg-white border border-blue-500/30 rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-center text-blue-400">
              Police Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Case Number
                  </label>
                  <input
                    type="text"
                    name="caseNumber"
                    value={formData.caseNumber}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Reporting Officer
                  </label>
                  <input
                    type="text"
                    name="reportingOfficer"
                    value={formData.reportingOfficer}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Badge Number
                  </label>
                  <input
                    type="text"
                    name="badgeNumber"
                    value={formData.badgeNumber}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
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
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Incident Type
                  </label>
                  <select
                    name="incidentType"
                    value={formData.incidentType}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="theft">Theft</option>
                    <option value="assault">Assault</option>
                    <option value="burglary">Burglary</option>
                    <option value="vandalism">Vandalism</option>
                    <option value="domestic">Domestic Incident</option>
                    <option value="traffic">Traffic Incident</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Victim Information
                  </label>
                  <input
                    type="text"
                    name="victimName"
                    value={formData.victimName}
                    onChange={handleChange}
                    placeholder="Victim Name"
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="text"
                    name="victimContactInfo"
                    value={formData.victimContactInfo}
                    onChange={handleChange}
                    placeholder="Contact Information"
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Suspect Description */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Suspect Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Incident Narrative */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                  />
                </div>

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

                {/* Status and Priority */}
                <div className="col-span-2 md:grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Priority
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full p-3 mt-4 bg-gray-50 border border-blue-400 rounded-lg text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
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

export default PoliceReportForm;
