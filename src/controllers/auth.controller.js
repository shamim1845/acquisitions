import logger from '#config/logger.js';
import { createUser, hashPassword } from '#services/auth.service.js';
import { formatValidationError } from '#utils/format.js';
import { jwttoken } from '#utils/jwt.js';
import { signupSchema } from '#validations/auth.validation.js';

export const signup = async (req, res, next) => {
  try {
    // Schema Validation
    const validationResult = signupSchema.safeParse(req.body);

    // Handle validation errors
    if (!validationResult.success) {
      const errorMessages = formatValidationError(validationResult.error);
      logger.warn('Signup validation failed:', errorMessages);

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

export const signin = (req, res) => {
  const token = jwttoken.sign({
    id: 1,
    name: 'Md Shamim Hossain',
    email: 'samimraj1845@gmail.com',
  }); // Example payload

  res.status(200).json({ message: 'Signin successful!', token });
};

export const signout = (req, res) => {
  res.status(200).json({ message: 'Signout successful!' });
};
