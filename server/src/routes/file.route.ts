import { Router } from 'express';
import {generate, open, save} from '../controllers/file.controller';

const router = Router();

router.get('/generate', generate);
router.post('/open', open);
router.put('/save', save);

export default router;