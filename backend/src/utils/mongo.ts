import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(
      "Connected to MongoDB. Used database:",
      mongoose.connection.db?.databaseName
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export const closeDatabaseConnection = async () => {
  await mongoose.connection.close();
};
