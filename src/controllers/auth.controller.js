import logger from '#config/logger.js';
import { createUser, hashPassword } from '#services/auth.service.js';
import { formatValidationError } from '#utils/format.js';
import { jwttoken } from '#utils/jwt.js';
import { signinSchema, signupSchema } from '#validations/auth.validation.js';

export const signup = async (req, res, next) => {
  try {
    // Schema Validation
    const validationResult = signupSchema.safeParse(req.body);

    // Handle validation errors
    if (!validationResult.success) {
      const errorMessages = formatValidationError(validationResult.error);
      logger.warn(`Signup validation failed: ${errorMessages}`);

      return res
        .status(400)
        .json({ error: 'Validation failed', details: errorMessages });
    }

    // Extract validated data
    const { name, email, password, role } = validationResult.data;

    // WIP: Auth service to handle user creation
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log(user);

    // Success response
    logger.info(`User signed up successfully: ${email}`);
    res.status(201).json({
      message: 'Signup successful.',
      data: user,
    });
  } catch (error) {
    logger.error('Signup error:', error);

    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ error: 'Email already exist.' });
    }

    next(error);
  }
};

export const signin = (req, res, next) => {
  try {
    // Schema Validation
    const validationResult = signinSchema.safeParse(req.body);

    // Handle validation errors
    if (!validationResult.success) {
      const errorMessages = formatValidationError(validationResult.error);
      logger.warn(`Signin validation failed: ${errorMessages}`);

      return res
        .status(400)
        .json({ error: 'Validation failed', details: errorMessages });
    }

    // Extract validated data
    const { email, password } = validationResult.data;

    // Find user by email and verify password
    const user = {
      id: 1,
      name: 'Md Shamim Hossain',
      email,
      password,
    };

    const token = jwttoken.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }); // Example payload

    res.status(200).json({ message: 'Signin successful!', token });
  } catch (error) {
    logger.error('Signin error:', error);

    next(error);
  }
};

export const signout = (req, res) => {
  res.status(200).json({ message: 'Signout successful!' });
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwttoken.verify(token);
    res.status(200).json({ message: 'Token is valid', decoded });
  } catch (error) {
    logger.warn('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
