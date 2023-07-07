import { connect, connection } from "mongoose";

export const connectDB = async () => {
  if (connection.readyState === 1) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
