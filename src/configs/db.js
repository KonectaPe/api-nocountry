import mongoose from "mongoose";
import { MONGO_URI } from "./environments.js";

export const connectionDb = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {});
    console.log(db.connection.name);
  } catch (error) {
    console.error({ error: error.message });
  }
};
