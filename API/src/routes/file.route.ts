import { Router } from "express";
import {
  addTag,
  auth,
  generate,
  open,
  passwordProtect,
  removeFile,
  removeTag,
  save
} from "../controllers/file.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/generate", generate); // change to post
router.post("/open", open);
router.put("/save", save);
router.post("/auth", auth);
router.post("/lock", passwordProtect);
router.delete("/delete", removeFile);
// TODO: add change name

// file tag
router.post("/addTag", addTag);
router.delete("/removeTag", removeTag);

export default router;