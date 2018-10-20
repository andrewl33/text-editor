import { Router } from 'express';
import { addTag, getAllTags } from '../controllers/tag.controller';

const router = Router();

router.post('/add', addTag);
router.get('/all', getAllTags);

export default router;