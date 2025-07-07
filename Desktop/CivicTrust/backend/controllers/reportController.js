import Report from '../models/fileReportModel.js';
import { io } from '../server.js'; // Importing Socket.IO instance

// File a new complaint
export const fileReport = async (req, res) => {

  try {
    const { reportType, description, location, filedBy, phone } = req.body;

    // Validate required fields
    if (!reportType || !description || !location || !filedBy || !phone) {
      return res.status(400).json({ error: "All fields are required: reportType, description, location" });
    }

    // Validate location format
    if (typeof location === "object") {
      if (location.lat === undefined || location.lng === undefined) {
        return res.status(400).json({ error: "Location must have lat and lng" });
      }
    } else if (typeof location !== "string" || !location.trim()) {
      return res.status(400).json({ error: "Location must be a valid string or lat/lng object" });
    }

    // Validate filedBy as a valid MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(filedBy)) {
    //   return res.status(400).json({ error: "Invalid user ID for filedBy" });
    // }

    // Create and save the report
    const report = await Report.create({
      reportType,
      description,
      location,
      filedBy,
      phone,
      status: "Pending",
      filedAt: new Date(),
    });

    res.status(201).json({ message: "Report filed successfully", report });

  } catch (error) {
    console.error("Error filing report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all complaints
export const getReports= async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
};

export const getReportsByPhone = async (req, res) => {
  const {phone} = req.params;

  try {
    const reports = await Report.find({phone: phone})
    if (!reports || reports.length === 0) {
      return res.status(404).json({ message: 'No reports found for this citizen.' });
    }

    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'error in getReportsByPhone controller ' });

  }
}
// export const getReportStatus = async (req, res) => {
//   const {phone} = req.params;

//   try {
//     const reports = await Report.find({phone: phone})
//     if (!reports || reports.length === 0) {
//       return res.status(404).json({ message: 'No reports found for this citizen.' });
//     }

//     res.status(200).json(reports.status);
//   } catch (error) {
//     console.error('Error fetching report status:', error);
//     res.status(500).json({ message: 'error in getReportStatus controller ' });

//   }
// }
