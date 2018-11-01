import { Router } from "express";
import { addTag, getAllTags } from "../controllers/tag.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

// TODO: check all
router.post("/add", addTag);
router.get("/all", getAllTags);

export default router;
