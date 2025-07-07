import express from 'express';
import { fileReport, getReports, getReportsByPhone } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to file a report (Only Citizens can file reports)
router.post('/fileReport', protect(['citizen']), fileReport);

// Route to get all reports (Only Police can access)
router.get('/getReports', protect(['police']), getReports);

router.get('/getReportStatus/:phone', getReportsByPhone);

// router.get('/getReportsStatus/:phone', protect(['police']), getReportStatus);




export default router;
