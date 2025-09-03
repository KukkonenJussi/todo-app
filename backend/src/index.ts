import app from "./app";
import dotenv from "dotenv";
import { connectToDatabase } from "../src/utils/mongo";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

void startServer();
