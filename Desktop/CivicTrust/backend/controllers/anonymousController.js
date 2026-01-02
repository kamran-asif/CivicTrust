
import anonymousTip from "../models/anonymousTipModel.js";
import { v4 as uuidv4 } from "uuid";

const parseLocation = (location) => {
  const coords = location.split(",").map(Number);

  if (coords.length !== 2 || coords.some(isNaN)) {
    throw new Error("Invalid location format. Use 'lat,lng'");
  }

  return {
    type: "Point",
    coordinates: coords,
  };
};

export const fileTip = async (req, res) => {
  try {
    const { description, location } = req.body;
    const media = req.files || [];

    if (!description?.trim() || !location) {
      return res.status(400).json({
        message: "Description and location are required",
      });
    }

    const mediaUrls = media.map((file) => file.path || file.url);
    const anonymousId = uuidv4();

    const newTip = await anonymousTip.create({
      description: description.trim(),
      media: mediaUrls,
      location: parseLocation(location),
      status: "Pending",
      reviewedBy: null,
      badgeNumber: null,
      anonymousId,
    });

    return res.status(201).json({
      message: "Tip filed successfully",
      anonymousId,
      tipId: newTip._id,
    });
  } catch (error) {
    console.error("Error filing tip:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


export const getPendingTips = async (req, res) => {
  try {
    const tips = await anonymousTip
      .find({ status: "Pending" })
      .sort({ createdAt: -1 })
      .limit(4);

    if (!tips.length) {
      return res.status(404).json({ message: "No pending tips found" });
    }

    return res.status(200).json({ tips });
  } catch (error) {
    console.error("Error fetching pending tips:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTipById = async (req, res) => {
  try {
    const tip = await anonymousTip.findById(req.params.id);

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    return res.status(200).json({ tip });
  } catch (error) {
    console.error("Error fetching tip:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const markTipAsReviewed = async (req, res) => {
  try {
    const { reviewedBy, badgeNumber } = req.body;

    if (!reviewedBy || !badgeNumber) {
      return res.status(400).json({
        message: "reviewedBy and badgeNumber are required",
      });
    }

    const updatedTip = await anonymousTip.findByIdAndUpdate(
      req.params.id,
      {
        status: "Reviewed",
        reviewedBy,
        badgeNumber,
      },
      { new: true }
    );

    if (!updatedTip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    return res.status(200).json({
      message: "Tip marked as reviewed",
      tip: updatedTip,
    });
  } catch (error) {
    console.error("Failed to review tip:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getTipsByAnonymousId = async (req, res) => {
  try {
    const tips = await anonymousTip.find({
      anonymousId: req.params.anonymousId,
    });

    if (!tips.length) {
      return res.status(404).json({ message: "No tips found for this ID" });
    }

    return res.status(200).json({ tips });
  } catch (error) {
    console.error("Error fetching tips:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
