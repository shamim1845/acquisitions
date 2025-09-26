import express from 'express';
import {
  signin,
  signout,
  signup,
  verifyToken,
} from '#controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', signin);

router.post('/sign-out', signout);

router.get('/verify-token', verifyToken);

export default router;
