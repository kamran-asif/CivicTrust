"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const CaseDetailDisplay = () => {
  const router = useRouter();

  const params = useParams();
  const caseNumber = params.caseNumber; // Access route param from the dynamic segment

  const [caseDetails, setCaseDetails] = useState(null);
  const [message, setMessage] = useState("Mark as resolved");

  useEffect(() => {
    if (!caseNumber) return;

    const fetchCase = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5001/api/cases/searchCase`,
          {
            params: {
              type: "caseNumber",
              query: caseNumber,
            },
            headers: {
              Authorization: `Bearer ${token}`, // 👈 send token here
            },
          }
        );
        // Assuming res.data is an array of matched cases
        setCaseDetails(res.data[0]); // Just the first match
      } catch (err) {
        console.error("Failed to fetch case:", err);
      }
    };

    fetchCase();
  }, [caseNumber]);

  if (!caseDetails) return <p className="text-white">Loading...</p>;

  const goBack = () => {
    router.back(); // Navigates to the previous page in history
  };

  const handleMarkAsResolved = async () => {
    try {
      const response = await fetch("/api/mark-resolved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseId: caseDetails.caseNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark as resolved");
      }

      const result = await response.json();
      alert("✅ Case marked as resolved!");
      // Optionally redirect or update UI
    } catch (error) {
      console.error("Error marking case as resolved:", error);
      alert("❌ Could not mark as resolved. Please try again.");
    }
  };

  const markAsResolved = async () => {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token)
    // console.log("i am the decoded token haha :", decoded.name);
    if (decoded.name !== caseDetails.reportingOfficer) {
      setMessage("❌ Only assigned officer can mark as resolved.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/cases/markAsResolved", {
        caseNumber: caseDetails.caseNumber,
      });

      if (response.status === 200) {
        setMessage("✅ Case successfully marked as Closed.");
      } else {
        setMessage("⚠️ Failed to mark case. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setMessage("🚨 An error occurred while marking the case.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4 flex flex-col items-center">
      {/* Back Button */}
      <div className="w-full max-w-6xl mb-4">
        <button
          onClick={goBack}
          className="flex items-center text-blue-300 hover:text-blue-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      <div className="w-full max-w-6xl bg-gradient-to-br from-slate-900 to-blue-900 rounded-lg shadow-xl border border-blue-500/30 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-blue-900/50 px-8 py-6 border-b border-blue-500/30">
          <h2 className="text-4xl font-bold text-blue-300">Case Details</h2>
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-8">
          {/* Description Card */}
          <div className="bg-slate-800/60 rounded-lg p-6 border border-blue-500/20 shadow-inner">
            <h3 className="text-xl text-blue-400 font-semibold mb-3">
              Case Description
            </h3>
            <p className="text-lg text-blue-200">{caseDetails.description}</p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Case Identifiers */}
            <div className="bg-slate-800/40 rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <h3 className="text-xl text-blue-400 font-semibold mb-4 pb-2 border-b border-blue-500/30">
                Case Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Case Number
                  </p>
                  <p className="text-blue-300 text-lg font-semibold">
                    {caseDetails.caseNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Priority</p>
                  <div className="mt-1">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium
                  ${
                    caseDetails.priority === "High"
                      ? "bg-red-500/20 text-red-300"
                      : caseDetails.priority === "Medium"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-green-500/20 text-green-300"
                  }`}
                    >
                      {caseDetails.priority}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">Status</p>
                  <div className="mt-1">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium
                  ${
                    caseDetails.status === "Open"
                      ? "bg-blue-500/20 text-blue-300"
                      : caseDetails.status === "Closed"
                      ? "bg-gray-500/20 text-gray-300"
                      : "bg-purple-500/20 text-purple-300"
                  }`}
                    >
                      {caseDetails.status}
                    </span>
                  </div>
                </div>
                <div className="pt-4 mt-4 border-t border-blue-500/20">
                  {caseDetails.media?.length > 0 && caseDetails.media[0] ? (
                    <div className="mt-3">
                      <a
                        href={caseDetails.media[0]}
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
            </div>

            {/* Middle Column - Location */}
            <div className="bg-slate-800/40 rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <h3 className="text-xl text-blue-400 font-semibold mb-4 pb-2 border-b border-blue-500/30">
                Location Details
              </h3>
              <div className="mt-4">
                <p className="text-gray-400 text-sm font-medium">
                  Incident Location
                </p>
                <p className="text-blue-300 text-lg mt-1">
                  {caseDetails.location}
                </p>
              </div>

              {/* Placeholder for a map or additional location info */}
              <div className="mt-6 h-40 bg-slate-700/50 rounded-lg border border-blue-500/10 flex items-center justify-center">
                <p className="text-blue-400/70">Location Map</p>
              </div>
            </div>

            {/* Right Column - Assignment */}
            <div className="bg-slate-800/40 rounded-lg p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
              <h3 className="text-xl text-blue-400 font-semibold mb-4 pb-2 border-b border-blue-500/30">
                Assignment
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Assigned To
                  </p>
                  <p className="text-blue-300 text-lg font-semibold">
                    {caseDetails.reportingOfficer}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Officer Badge number
                  </p>
                  <p className="text-blue-300 text-lg">
                    {caseDetails.badgeNumber}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    Time of filing
                  </p>
                  <p className="text-blue-300 text-lg">
                    {(() => {
                      const date = new Date(caseDetails.dateTime);
                      return `on ${date.getDate()} ${date.toLocaleString(
                        "default",
                        {
                          month: "long",
                        }
                      )} ${date.getFullYear()} at ${date.toLocaleTimeString(
                        "en-GB",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        }
                      )}`;
                    })()}
                  </p>
                </div>
              </div>
              {/* Action Button */}
              <div className="p-8 pt-6 w-full max-w-6xl flex flex-col items-center space-y-3">

                <button
                  onClick={markAsResolved}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
                >
                  {message}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailDisplay;
