import mongoose, { model } from "mongoose";

export interface MessageType extends Document {
  sender: String;
  receiver: String;
  text: string;
  messageType: String;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      
      type: String,
      required: function () {
        return this.messageType === "text"; // require for text message
      },
    },
    messageType: {
      type: String,
      enum: ["text", "image", "audio", "emoji"],
      default: "text",
    },
  },
  { timestamps: true },
);

export const messageModel = model<MessageType> ('messages', messageSchema)
