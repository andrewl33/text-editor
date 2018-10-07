import { Router } from 'express';
import {auth, generate, open, save, passwordProtect} from '../controllers/file.controller';
import { auth as authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/generate', generate);
router.post('/open', open);
router.put('/save', save);
router.post('/auth', auth);
router.post('/lock', passwordProtect);

export default router;