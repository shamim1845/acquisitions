import jwt from 'jsonwebtoken';
import logger from '#config/logger.js';

const JWT_SECRET = String(process.env.JWT_SECRET || 'your_jwt_secret_key');
const JWT_EXPIRES_IN = String(process.env.JWT_EXPIRES_IN || '1h');

export const jwttoken = {
  sign: payload => {
    try {
      return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    } catch (error) {
      logger.error('Token signing failed:', error);
      throw new Error('Token signing failed');
    }
  },
  verify: token => {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      logger.error('Token verification failed:', error);
      throw new Error('Token verification failed');
    }
  },
};
