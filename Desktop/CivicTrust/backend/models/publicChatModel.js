import mongoose from "mongoose";

const PublicChatMessageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const PublicChatMessage = mongoose.model("PublicChatMessage", PublicChatMessageSchema);

export default PublicChatMessage;