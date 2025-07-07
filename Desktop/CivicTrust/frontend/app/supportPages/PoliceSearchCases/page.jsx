"use client";
import React, { useState } from "react";
import axios from 'axios';
import {
  Search,
  FileText,
  User,
  Phone,
  MapPin,
  Clock,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import for navigation


const PoliceSearchCases = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("caseNumber");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter(); // Initialize router for navigation


  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Replace with your actual API endpoint
      const token = sessionStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5001/api/cases/searchCase?type=${searchType}&query=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("🔍 Search response:", data);
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching cases:", error);
      // You could add error state handling here
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaseClick = (caseNumber) => {
    router.push(`/supportPages/PoliceCaseDetailDisplay/${caseNumber}`); // Navigate to the case detail page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="text-blue-400 h-8 w-8" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Search Records
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-300" />
              </div>
              <span className="text-blue-300">Officer</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Back button */}
        <div>
          <a href="/dashboard/policeDashboard" className="inline-flex items-center text-blue-300 hover:text-blue-100 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Dashboard</span>
          </a>
        </div>

        {/* Search Form */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
          <h2 className="text-xl font-semibold text-white mb-6">
            Search Police Cases
          </h2>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label
                  htmlFor="searchTerm"
                  className="block text-blue-300 mb-2"
                >
                  Search Term
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 border border-blue-400/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter search term..."
                />
              </div>

              <div>
                <label
                  htmlFor="searchType"
                  className="block text-blue-300 mb-2"
                >
                  Search By
                </label>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-white/10 border border-blue-400/30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="caseNumber">Case Number</option>
                  <option value="victimName">Victim Name</option>
                  <option value="victimContactInfo">Victim Contact Info</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors duration-300 w-full md:w-auto"
            >
              <Search className="h-5 w-5 mr-2" />
              Search Cases
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Search Results</h2>
            <div className="flex space-x-2">
              <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
                <Filter className="h-5 w-5 text-blue-300" />
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {hasSearched && searchResults.length === 0 ? (
                <div className="bg-white/5 rounded-lg p-8 text-center">
                  <p className="text-blue-200">
                    No cases found matching your search criteria.
                  </p>
                </div>
              ) : (
                searchResults.map((case_) => (
                  <div
                    key={case_._id}
                    className="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all"
                    onClick={() => handleCaseClick(case_.caseNumber)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-blue-300">
                            {case_.caseNumber}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              case_.priority === "High"
                                ? "bg-red-500/20 text-red-200"
                                : case_.priority === "Medium"
                                ? "bg-yellow-500/20 text-yellow-200"
                                : "bg-green-500/20 text-green-200"
                            }`}
                          >
                            {case_.priority}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              case_.status === "Open"
                                ? "bg-blue-500/20 text-blue-200"
                                : case_.status === "Closed"
                                ? "bg-gray-500/20 text-gray-200"
                                : "bg-purple-500/20 text-purple-200"
                            }`}
                          >
                            {case_.status}
                          </span>
                        </div>
                        <h3 className="text-white font-medium mt-1">
                          {case_.incidentType}
                        </h3>
                        <p className="text-blue-200 text-sm mt-1">
                          {case_.description}
                        </p>
                      </div>
                      <span className="text-sm text-blue-300">
                        {new Date(case_.dateTime).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-blue-200">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{case_.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>
                          {case_.reportingOfficer} ({case_.badgeNumber})
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-4 w-4" />
                        <span>{case_.victimContactInfo}</span>
                      </div>
                    </div>
                    {case_.media?.length > 0 && case_.media[0] ? (
                      <div className="mt-3">
                        <a
                          href={case_.media[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                          onClick={(e) => e.stopPropagation()} // Prevent the parent onClick from firing
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
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoliceSearchCases;
