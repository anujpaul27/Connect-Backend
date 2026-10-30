import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away'; 
  role: string;
  bio?: string;
  lastSeen: string;
  unreadCount: number;
}

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: [true, 'User ID is required'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    avatar: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['online', 'offline', 'away'],
      default: 'offline',
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    bio: {
      type: String,
      maxlength: [160, 'Bio cannot exceed 160 characters'],
      default: '',
    },
    lastSeen: {
      type: String,
      default: 'Just now',
    },
    unreadCount: {
      type: Number,
      default: 0,
      min: [0, 'Unread count cannot be negative'],
    },
  },
  {
    timestamps: true,
    // Automatically map virtual 'id' to JSON outputs if needed
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const User = model<IUser>('User', userSchema);
