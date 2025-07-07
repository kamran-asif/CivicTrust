"use client";
import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  FileX,
  MapPin,
  Phone,
  User,
  Filter,
  Search,
} from "lucide-react";

const CitizenCasesForPoliceDash = () => {
  const [citizenReports, setCitizenReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [totalReports, setTotalReports] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  

  useEffect(() => {
    fetchCitizenReports();
  }, [statusFilter]);

  const fetchCitizenReports = async (pageNum = 1) => {
    if (pageNum === 1) setIsLoading(true);
    else setIsLoadingMore(true);

    try {
      // Adjust the URL to your API endpoint
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/reports/getReports`,
        {
          method: "GET", // Or 'POST', depending on your API
          headers: {
            "Content-Type": "application/json", // Set content type if necessary
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
          },
        }
      );
      //   console.log("this is the response :", response);
      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();
      console.log("this is the data: ", data);

      if (pageNum === 1) {
        setCitizenReports(data);
      } else {
        setCitizenReports((prev) => [...prev, ...data]);
      }

      setTotalReports(data.total);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setPage(1);
  };

  // Handle loading more reports
  const handleLoadMore = () => {
    fetchCitizenReports(page + 1);
  };

  // Format time ago function
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} min ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  // Action handlers
  const handleAssignReport = (reportId) => {
    // Navigate to assignment page or open modal
    // For example: router.push(`/supportPages/AssignComplaint/${reportId}`);
    console.log("Assign report:", reportId);
  };

  const handleUpdateReport = (reportId) => {
    // Navigate to update page or open modal
    // For example: router.push(`/supportPages/UpdateComplaint/${reportId}`);
    console.log("Update report:", reportId);
  };

  const contactVictim = (phone) => {
    // console.log("this is phone number :", phone);
    alert(`calling victim on phone : ${phone}`)
  };

  return (
    <div className="lg:col-span-2 space-y-6">
  <div className="bg-slate-800/50 backdrop-blur-md rounded-xl p-6 border border-amber-400/20">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-semibold text-white flex items-center">
        <AlertCircle className="h-5 w-5 text-amber-400 mr-2" />
        Citizen Complaints
      </h2>
    </div>

    {isLoading ? (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-400"></div>
      </div>
    ) : error ? (
      <div className="bg-red-500/20 text-red-300 p-4 rounded-xl text-center">
        Error loading complaints: {error}
      </div>
    ) : (
      <div>
        {/* Fixed height container with overflow for scrolling */}
        <div className="h-96 overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#fbbf24 #334155' }}>
          <div className="space-y-4">
            {citizenReports &&
              Array.isArray(citizenReports) &&
              citizenReports.map((report) => (
                <div
                  key={report._id}
                  className={`bg-white/5 hover:bg-white/10 border-l-4 rounded-r-xl rounded-l p-5 cursor-pointer transition-all shadow-md ${
                    report.priority === "High"
                      ? "border-red-500"
                      : report.priority === "Medium"
                      ? "border-yellow-500"
                      : "border-green-500"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm text-blue-300 font-mono">
                          #{report.reportNumber || report._id.slice(0, 6)}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            report.priority === "High"
                              ? "bg-red-500/20 text-red-300"
                              : report.priority === "Medium"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-green-500/20 text-green-300"
                          }`}
                        >
                          {report.priority || "Standard"}
                        </span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-semibold ${
                            report.status === "Unassigned"
                              ? "bg-amber-500/20 text-amber-300"
                              : report.status === "In Progress"
                              ? "bg-blue-500/20 text-blue-300"
                              : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {report.status || "Unassigned"}
                        </span>
                      </div>
                      <h3 className="text-white text-lg font-semibold">
                        {report.title}
                      </h3>
                      <p className="text-blue-200 text-sm mt-1">
                        {report.description.length > 120
                          ? `${report.description.substring(0, 120)}...`
                          : report.description}
                      </p>
                    </div>
                    <span className="text-xs text-blue-400 whitespace-nowrap">
                      <div>
                        <span className="text-sm text-blue-400 ml-2">
                          ({new Date(report.filedAt).toLocaleString()})
                        </span>
                      </div>
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-blue-200">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <p>
                          Location:
                          {report.location
                            ? `Lat: ${report.location.lat}, Lng: ${report.location.lng}`
                            : "Not provided"}
                        </p>
                      </div>
                      {report.assignedOfficer ? (
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{report.assignedOfficer}</span>
                        </div>
                      ) : report.contactNumber ? (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{report.contactNumber}</span>
                        </div>
                      ) : null}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => contactVictim(report.phone)}
                        className="bg-blue-700 text-white hover:bg-blue-800 px-6 py-3 rounded-xl text-base font-semibold shadow-lg transition duration-200"
                      >
                        Get in touch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Pagination controls */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-blue-300 text-sm">
            Showing only 2 of {citizenReports ? citizenReports.length : 0} complaints
          </div>
          
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default CitizenCasesForPoliceDash;
