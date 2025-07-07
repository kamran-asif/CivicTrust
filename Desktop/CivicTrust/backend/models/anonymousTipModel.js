import mongoose from "mongoose";

// Define the schema for the tip submission
const tipSchema = new mongoose.Schema({
  description: { 
    type: String, 
    required: true 
  },
  media: [{ 
    type: [String],  
    default: [],
    required: false  // Optional field, can be empty if no media is uploaded
  }],
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
  submitted_at: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    default: 'Pending' 
  },
  reviewedBy : {
    type : String,
    defualt : ""
  },
  badgeNumber: {
    type : Number,
    default: ""
  },
  anonymousId: {
    type: String,
    required: true,
    unique: true,
  },
  
});

// Create the model
const anonymousTip = mongoose.model('anonymousTip', tipSchema);

export default anonymousTip;
