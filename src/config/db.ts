import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const connString: string = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/auth_db';
    const conn = await mongoose.connect(connString);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Failed to connect to MongoDB:`, error);
    process.exit(1);
  }
};
