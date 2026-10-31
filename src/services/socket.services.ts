import { Server } from "socket.io";

export function initSocket(server) {
  // 1. Initialize the Socket.io server with CORS configuration
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow your frontend dev server
      methods: ["GET", "POST"],
    },
  });

  // 2. Handle global connection events
  io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);

    // Example: Handle a custom event from the client
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
      console.log(`👥 User ${socket.id} joined room: ${roomId}`);
    });

    // 3. Handle disconnection cleanup
    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  return io;
}
