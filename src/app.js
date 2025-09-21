import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import logger from '#config/logger.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  morgan('combined', {
    stream: { write: message => logger.info(message.trim()) },
  })
);

// Root endpoint
app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');

  res.status(200).json({ message: 'Welcome to acquisitions!' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('Health check endpoint accessed');

  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API status endpoint
app.get('/api', (req, res) => {
  logger.info('API status endpoint accessed');

  res.status(200).json({ message: 'Acquisitions API is running!' });
});

// API Routes
app.use('/api/auth', (await import('#routes/auth.routes.js')).default);

export default app;
