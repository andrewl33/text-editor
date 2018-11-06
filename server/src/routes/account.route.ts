import { Router } from "express";
import {
  addCollection,
  fillDashboard,
  getAllCollections,
  getAllFiles,
  getDashboard,
  removeCollection
} from "../controllers/account.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware("user"));

// file associations
router.get("/allCollections", getAllCollections);
router.get("/allFiles", getAllFiles);
router.get("/dashboard", fillDashboard);

// {
//   success: boolean,
//   payload?: {
//     files : Item[],
//     collections : Item[]
//   }
// }
router.post("/getDashboard", getDashboard);

export default router;
