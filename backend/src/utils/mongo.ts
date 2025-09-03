import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async () => {
  try {
    const uri = process.env.NODE_ENV === "test-mongo"
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;

    await mongoose.connect(uri!);
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
