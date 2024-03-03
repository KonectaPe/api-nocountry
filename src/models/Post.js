import mongoose from "mongoose";

const userPost = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    max: 255,
  },
  description: {
    type: String,
    trim: true,
    required: true,
    max: 255,
  },
  link: {
    type: String,
    trim: true,
    required: true,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Post", userPost);
