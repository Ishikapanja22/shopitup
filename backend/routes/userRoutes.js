import express from 'express';
import {
  signupUser,
  signinUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router(); 

router.post('/signup', signupUser);
router.post('/signin', signinUser);

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
