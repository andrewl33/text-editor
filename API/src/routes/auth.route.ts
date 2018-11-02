import { Router } from "express";
import {
  authenticateAccount,
  createAccount,
  logout
} from "../controllers/account.controller";
import { auth as authCollection } from "../controllers/collection.controller";
import { auth as authFile } from "../controllers/file.controller";
const router = Router();

// login authentication
/**
 * { success: boolean; accountName: string }
 */
router.post("/create", createAccount);
/**
 * payload?: {
 *  success: boolean;
 *  accountName: string;
 *  dashboard?: DashboardProps;
 * };
 */
router.post("/login", authenticateAccount);
/**
 * { success: boolean }
 */
router.post("/logout", logout);

router.post("/authFile", authFile);

router.post("/authCollection", authCollection);

export default router;
