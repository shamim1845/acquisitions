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

app.get('/', (req, res) => {
  logger.info('Root endpoint accessed');
  // logger.error('This is a sample error log');

  res.status(200).json({ message: 'Welcome to acquisitions!' });
});

export default app;
