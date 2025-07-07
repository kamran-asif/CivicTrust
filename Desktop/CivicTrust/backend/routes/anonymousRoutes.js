import express from 'express';
import { fileTip, getPendingTips, getTipById, markTipAsReviewed, getTipsByAnonymousId } from '../controllers/anonymousController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';
const router = express.Router();

// Route to file an anonymous tip
router.post('/fileAnonymousTip', upload.array('media'), fileTip);

router.get("/pendingAnonymousTips", protect(['police']), getPendingTips);

router.get("/tips/:id", getTipById);

router.patch("/tips/:id", markTipAsReviewed);

router.get("/tips/track/:anonymousId", getTipsByAnonymousId);


export default router;
