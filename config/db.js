import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const connectdB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return; // avoid reconnecting
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectdB;
