import { Router } from "express";
import {
  addCollection,
  addFile,
  fillDashboard,
  getAllCollections,
  getAllFiles,
  getDashboard,
  removeCollection,
  removeFile
} from "../controllers/account.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware("user"));

// file associations
router.get("/allCollections", getAllCollections);
router.get("/allFiles", getAllFiles);
router.get("/dashboard", fillDashboard);
// {
//   success: boolean;
//   accountName?: string;
// };
router.post("/addFile", addFile);

// { success: boolean; accountName?: string }
router.post("/addCollection", addCollection);

// {
//   success: boolean;
//   accountName?: string;
// };
router.post("/removeFile", removeFile);
// { success: boolean; accountName?: string }
router.post("/removeCollection", removeCollection);

// {
//   success: boolean,
//   payload?: {
//     files : Item[],
//     collections : Item[]
//   }
// }
router.post("/getDashboard", getDashboard);

export default router;
