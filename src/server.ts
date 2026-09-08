import dotenv from 'dotenv';
// Load environment variables before any other imports
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to MongoDB Database
  await connectDB();

  // Start Express Server Listener
  app.listen(PORT, () => {
    console.log(`[Server] Auth Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  });
};

startServer();
