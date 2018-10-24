import { Router } from "express";
import {
  addFile,
  auth,
  deleteCollection,
  generate,
  passwordProtect,
  removeFile,
  sendFileCollection
} from "../controllers/collection.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/create", generate); // change to post
router.post("/open", sendFileCollection);
router.post("/auth", auth);
router.post("/lock", passwordProtect);
router.delete("/delete", deleteCollection);

// TODO: changeName

router.post("/add", addFile);
router.delete("/remove", removeFile);

export default router;
