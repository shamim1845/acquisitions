import bcrypt from 'bcrypt';
import logger from '#config/logger.js';

export const hashPassword = async password => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(`Password hashing error: ${error}`);
    throw new Error('Password hashing failed');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    logger.error(`Password comparison error: ${error}`);
    throw new Error('Password comparison failed');
  }
};

export const createUser = async userData => {
  try {
    const user = { id: 1, ...userData };

    // Successfully created user
    logger.info(`Creating user with email: ${userData.email}`);
    return user;
  } catch (error) {
    logger.error(`User creation error: ${error}`);
    throw new Error('User creation failed');
  }
};
