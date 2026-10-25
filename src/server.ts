import dotenv from "dotenv";
// Load environment variables before any other imports
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;

// Connect server listing with socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: { 
    origin: "http://localhost:3000", // আপনার নেক্সট জেএস (Next.js) ক্লায়েন্টের পোর্ট এখানে দিতে হবে
    methods: ["GET", "POST"] 
  },
});

const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();

  // Socket Event handling
  io.on("connection", (socket: any) => { // 'connect'-এর বদলে 'connection' স্ট্যান্ডার্ড
    console.log(`A user Connected ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`); // এখানে ব্যাকটিক (`) মিসিং ছিল, ঠিক করে দেওয়া হয়েছে
    });
  });

  // Start Express Server Listener
  server.listen(PORT, () => {
    console.log(
      `[Server] Auth Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`
    );
  });
};

startServer();