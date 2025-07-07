import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  reportType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      lat: Number,
      lng: Number
    },
    required: true
  },
  filedBy: {
    type: String,
    ref: 'User', // Linking the report to the citizen who filed it
    required: true
  },
  phone : {
    type: Number,
    ref : "User"
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'], // Track the report's status
    default: 'Pending'
  },
  filedAt: {
    type: Date,
    default: Date.now
  }
});

const Report = mongoose.model('Report', ReportSchema);
export default Report;
