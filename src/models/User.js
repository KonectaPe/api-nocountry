import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 255,
  },
  username: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    min: 4,
    max: 255,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    min: 8,
    max: 50,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);
