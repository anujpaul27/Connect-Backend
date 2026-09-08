import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  role?: string;
}

export const generateToken = (userId: string, role: string = 'user'): string => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_key';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign({ id: userId, role }, secret, {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  });
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'fallback_jwt_secret_key';
  return jwt.verify(token, secret) as TokenPayload;
};
