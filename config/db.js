import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
dotenv.config();

const connectdB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to db ${process.env.MONGO_URL}`.bgCyan.white);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectdB;
