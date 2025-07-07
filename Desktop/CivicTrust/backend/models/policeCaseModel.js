import mongoose from 'mongoose';

const PoliceCaseSchema = new mongoose.Schema({
  caseNumber: {
    type: String,
    required: true,
    unique: true,
  },
  reportingOfficer: {
    type: String,
    required: true,
  },
  badgeNumber: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    required: true,
  },
  victimName: {
    type: String,
    required: true,
  },
  victimContactInfo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  evidence: {
    type: String, // optional field, if any notes about the evidence
  },
  media: {
    type: [String],  
    default: []      
  },
  additionalInfo: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Open', 'Closed', 'In Progress'],
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true
  }
});

const PoliceCase = mongoose.model('PoliceCase', PoliceCaseSchema);
export default PoliceCase;
