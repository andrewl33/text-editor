import { Router } from "express";
import {
  addCollection,
  addFile,
  getAllCollections,
  getAllFiles,
  removeCollection,
  removeFile
} from "../controllers/account.controller";
import { auth } from "../middleware/auth.middleware";

const router = Router();

router.use(auth);
// file associations
router.get("/allCollections", getAllCollections);
router.get("/allFiles", getAllFiles);
router.post("/addFile", addFile);
router.post("/addCollection", addCollection);
router.post("/removeFile", removeFile);
router.post("/removeCollection", removeCollection);

export default router;
