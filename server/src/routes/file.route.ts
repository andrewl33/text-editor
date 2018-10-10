import { Router } from 'express';
import { auth, generate, open, save, passwordProtect, removeFile, addTag, removeTag } from '../controllers/file.controller';
import { auth as authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.get('/generate', generate); // change to post
router.post('/open', open); 
router.put('/save', save); 
router.post('/auth', auth); 
router.post('/lock', passwordProtect);
router.delete('/delete', removeFile);

// file tag
router.post('/addTag', addTag);
router.delete('/deleteTag', removeTag);

export default router;