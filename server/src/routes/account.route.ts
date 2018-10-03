import { Router } from 'express';
import { authenticateAccount, createAccount } from '../controllers/account.controller';


const router = Router();

// login authentication
router.post('/create', createAccount);
router.post('/login', authenticateAccount);

export default router;