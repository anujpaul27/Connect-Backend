import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.utils';
import { User, IUser } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
  cookies: { [key: string]: string };
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  // 1. Check Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Check custom 'token' header
  else if (req.headers.token && typeof req.headers.token === 'string') {
    token = req.headers.token;
  }
  // 3. Check token in cookies
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access denied. No authentication token provided.',
    });
    return;
  }

  try {
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      res.status(401).json({
        success: false,
        message: 'The user belonging to this token no longer exists.',
      });
      return;
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
};
