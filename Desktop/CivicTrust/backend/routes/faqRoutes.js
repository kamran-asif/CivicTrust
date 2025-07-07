import express from 'express';
import {
  getFAQs,
  getFAQByQuestion,
  
} from '../controllers/faqController.js';

const router = express.Router();

// Get all FAQs (can filter by ?section=citizen|police|general)
router.get('/getFaq', getFAQs);

// Get a single answer by question text
router.get('/getAnswers/:question', getFAQByQuestion);


export default router;
