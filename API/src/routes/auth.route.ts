import { Router } from 'express';
import { authenticateAccount, createAccount, logout } from '../controllers/account.controller';

const router = Router();

// login authentication
router.post('/create', createAccount);
router.post('/login', authenticateAccount);
router.post('/logout', logout);

export default router;