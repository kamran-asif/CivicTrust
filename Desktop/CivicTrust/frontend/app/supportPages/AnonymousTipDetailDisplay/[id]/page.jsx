"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  MapPin,
  Calendar,
  AlertTriangle,
  FileText,
  Camera,
  ArrowLeft,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AnonymousTipDetailDisplay = () => {
  const params = useParams();
  const id = params.id;
  console.log("this is the id i have received : ", id);
  const router = useRouter();

  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tip data when component mounts or ID changes
    const fetchTip = async () => {
      try {
        setLoading(true);
        setError(null);

        // Make API request to your endpoint
        const response = await axios.get(
          `http://localhost:5001/api/anonymous/tips/${id}`
        );

        // Set tip data from response
        setTip(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tip:", err);
        setError(err.response?.data?.message || "Failed to load tip data");
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  const goBack = () => {
    router.back();
  };

  const handleMarkAsReviewed = async () => {
    const token = sessionStorage.getItem("token");

    if (!token) throw new Error("No token found");

    const decoded = jwtDecode(token);

    console.log("this is the decoded token : ", decoded);

    const officerName = decoded.name; // Or decoded.officerName
    const badgeNumber = decoded.badgeNumber;

    console.log("this is the name i have decoded : ", officerName);
    console.log("this is the badgenumber i have decoded : ", badgeNumber);

    try {
      await axios.patch(`http://localhost:5001/api/anonymous/tips/${id}`, {
        status: "Reviewed",
        reviewedBy: officerName,
        badgeNumber: badgeNumber,
      });
      // Update local state to reflect the change
      setTip((prev) => ({
        ...prev,
        status: "Reviewed",
        reviewedBy: officerName,
        badgeNumber: badgeNumber,
      }));
    } catch (err) {
      console.error("Error updating tip status:", err);
      // Handle error (could show a toast notification here)
    }
  };

  const handleLinkToCase = () => {
    // Navigate to case linking page or open modal
    navigate(`/cases/link-tip/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900 px-4 py-8 flex items-center justify-center">
        <div className="text-blue-300 text-xl">Loading tip details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-700 via-slate-400 to-blue-700 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={goBack}
            className="mb-6 flex items-center text-blue-300 hover:text-blue-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tips
          </button>

          <div className="bg-slate-800/60 rounded-xl p-12 text-center border border-blue-500/20">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-blue-300 text-xl mb-2">Error Loading Tip</div>
            <p className="text-blue-200/70">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={goBack}
            className="mb-6 flex items-center text-blue-300 hover:text-blue-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Tips
          </button>

          <div className="bg-slate-800/60 rounded-xl p-12 text-center border border-blue-500/20">
            <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <div className="text-blue-300 text-xl mb-2">Tip Not Found</div>
            <p className="text-blue-200/70">
              The anonymous tip you're looking for could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-blue-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={goBack}
          className="mb-6 flex items-center text-blue-300 hover:text-blue-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tips
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-blue-300">
              Anonymous Tip Details
            </h1>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium
              ${
                tip.status === "New"
                  ? "bg-blue-500/20 text-blue-300"
                  : tip.status === "Reviewed"
                  ? "bg-purple-500/20 text-purple-300"
                  : "bg-gray-500/20 text-gray-300"
              }`}
            >
              {tip.status || "New"}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-800/80 rounded-xl overflow-hidden border border-blue-500/20 shadow-lg">
          {/* Tip Header */}
          <div className="p-6 border-b border-blue-500/20">
            <div className="flex items-center space-x-4 mb-4">
              <div
                className={`p-3 rounded-lg ${
                  tip.priority === "High"
                    ? "bg-red-500/20"
                    : tip.priority === "Medium"
                    ? "bg-yellow-500/20"
                    : "bg-green-500/20"
                }`}
              >
                <AlertTriangle
                  className={`h-6 w-6 ${
                    tip.priority === "High"
                      ? "text-red-400"
                      : tip.priority === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-blue-300">
                  {tip.category || "Suspicious Activity"}
                </h2>
                <div className="text-gray-400 text-sm mt-1">
                  Tip ID: {tip._id}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center text-blue-300 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="font-medium">Reported Date</span>
                </div>
                <div className="text-blue-100">
                  Submitted At: {new Date(tip.submitted_at).toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center text-blue-300 mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="font-medium">Location</span>
                </div>
                <div className="text-white">
                  Location: {tip.location.coordinates[1]},{" "}
                  {tip.location.coordinates[0]}
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center text-blue-300 mb-2">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  <span className="font-medium">Priority Level</span>
                </div>
                <div
                  className={`${
                    tip.priority === "High"
                      ? "text-red-400"
                      : tip.priority === "Medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {tip.priority || "Low"}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence */}
          <div className="p-6 border-b border-blue-500/20">
            <h3 className="text-blue-400 font-medium mb-3 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Description
            </h3>
            <div className="bg-slate-900/50 rounded-lg p-4 text-blue-100">
              {tip.description}
            </div>
            {/* Evidence */}
            <div className="pt-4 mt-4 border-t border-blue-500/20">
              {tip.media?.length > 0 && tip.media[0] ? (
                <div className="mt-3">
                  <a
                    href={tip.media[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                  >
                    📎 View Attached Evidence
                  </a>
                </div>
              ) : (
                <div className="mt-3 text-sm text-gray-400 italic">
                  🚫 No evidence attached
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-slate-900/30">
            <div className="flex flex-wrap justify-end gap-3">
              {tip.status !== "Reviewed" && (
                <button
                  onClick={handleMarkAsReviewed}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-blue-300 rounded-lg text-sm flex items-center"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnonymousTipDetailDisplay;
