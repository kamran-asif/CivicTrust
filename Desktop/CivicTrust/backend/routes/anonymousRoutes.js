
import { Router } from "express";
import {
  fileTip,
  getPendingTips,
  getTipById,
  markTipAsReviewed,
  getTipsByAnonymousId,
} from "../controllers/anonymousController";
import { protect } from "../middleware/authMiddleware";
import upload from "../middleware/multer";

const router = Router();

router.post(
  "/tips",
  upload.array("media"),
  fileTip
);


router.get(
  "/tips/pending",
  protect(["police"]),
  getPendingTips
);


router.get(
  "/tips/:tipId",
  protect(["police", "admin"]),
  getTipById
);


router.patch(
  "/tips/:tipId/review",
  protect(["police"]),
  markTipAsReviewed
);

/**
   get /api/anonymous/track/:anonymousId
 *   track tips using anonymous ID
  public
 */
router.get(
  "/track/:anonymousId",
  getTipsByAnonymousId
);

export default router;
