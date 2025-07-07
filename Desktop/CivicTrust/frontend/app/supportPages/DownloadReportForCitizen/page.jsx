"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import html2pdf from "html2pdf.js";

const DownloadReportForCitizen = () => {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data")); // or pull from localStorage/sessionStorage

  useEffect(() => {
    const timer = setTimeout(() => {
      const element = document.getElementById("report-content");

      html2pdf()
        .from(element)
        .set({
          margin: 0.5,
          filename: `Complaint_Report_${data.caseType}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        })
        .save();
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  return (
    <div
      id="report-content"
      className="p-10 bg-white text-black w-full min-h-screen font-serif space-y-8"
    >
      {/* Header Section */}
      <div className="text-center border-b border-gray-400 pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wide mb-1">
          Police Department
        </h1>
        <h2 className="text-xl font-medium text-gray-700">
          Official Complaint Report
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Generated on: {new Date().toLocaleString()}
        </p>
      </div>

      {/* Case Information */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-gray-700">
          Case Information
        </h3>
        <p>
          <strong>Case Type:</strong> {data.incidentType || "N/A"}
        </p>
        <p>
          <strong>Status:</strong> {data.status || "N/A"}
        </p>
        <p>
          <strong>Filed On:</strong> {new Date(data.dateTime).toLocaleString()}
        </p>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-gray-700">
          Case Description
        </h3>
        <p className="bg-gray-100 p-4 rounded text-sm text-gray-800 border border-gray-300 leading-relaxed">
          {data.description || "No description provided."}
        </p>
      </div>

      {/* Victim & Reporter Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-700">
            Victim Details
          </h3>
          <p>
            <strong>Name:</strong> {data.victimeName || "N/A"}
          </p>
          <p>
            <strong>Contact Info:</strong> {data.victimContactInfo || "N/A"}
          </p>
          <p>
            <strong>Location:</strong> {data.location || "N/A"}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-700">Filed By</h3>
          <p>
            <strong>Reporting officer:</strong> {data.reportingOfficer || "N/A"}
          </p>
        </div>
      </div>

      {/* Notes */}
      {data.notes && (
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-700">
            Additional Notes
          </h3>
          <p className="text-gray-800 leading-relaxed">{data.notes}</p>
        </div>
      )}

      {/* Signature Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-2">
          <div className="border-t border-gray-400 w-64"></div>
          <p className="text-sm text-gray-700">
            Signature of Reporting Officer
          </p>
        </div>
        <div className="space-y-2">
          <div className="border-t border-gray-400 w-64"></div>
          <p className="text-sm text-gray-700">Signature of Complainant</p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-8 border-t border-gray-300 text-sm text-gray-600 text-center space-y-1 mt-12">
        <p>This document is generated for informational purposes only.</p>
        <p>© {new Date().getFullYear()} City Police Department</p>
      </div>
    </div>
  );
};

export default DownloadReportForCitizen;
