import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Core Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Authorization', 'token'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Root Health Check Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Authentication API Server is running smoothly!',
  });
});

// API Routes
app.use('/api/auth', authRoutes);

// 404 Handler for Unhandled Routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});



// Global Error Handler
app.use(errorHandler);

export default app;
