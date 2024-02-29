import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 255,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    min: 8,
    max: 255,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
