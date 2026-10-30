import { Router } from 'express';
import { register, login, getProfile, getAllUser } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getProfile);
router.get('/get-all-user', getAllUser)

export default router;
