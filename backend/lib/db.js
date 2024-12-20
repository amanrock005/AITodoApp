import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to MONGODB ", conn.connection.host);
  } catch (err) {
    console.log("error in connecting with mongoDB ", err);
    process.exit(1);
  }
};
