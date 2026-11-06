import dotenv from "dotenv";
// Load environment variables before any other imports
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import http from "http";

const PORT = process.env.PORT || 5000;

// Connect server listing with socket.io
const server = http.createServer(app);

const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();



  // Start Express Server Listener
  server.listen(PORT, () => {
    console.log(
      `[Server] Auth Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`
    );
  });
};

startServer();