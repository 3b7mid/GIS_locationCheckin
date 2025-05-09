import mongoose from "mongoose";
import "dotenv/config";

const dbConnection = async (req, res) => {
  const URI = process.env.MONGO_URI;
  await mongoose.connect(URI);
  console.log(`Databse conncetd successfully`);
};

export default dbConnection;
