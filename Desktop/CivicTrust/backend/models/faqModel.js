// backend/models/faqModel.js
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  section: {
    type: String,
    enum: ['citizen', 'police', 'general'],
    default: 'general',
    required: true,
  }
}, { timestamps: true });

const FAQ = mongoose.model('FAQ', faqSchema);
export default FAQ;
