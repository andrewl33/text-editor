import { Router } from "express";
import {
  addCollection as addUser,
  removeCollection as removeUser
} from "../controllers/account.controller";
import {
  addFile,
  auth,
  changeName,
  deleteCollection,
  generate,
  passwordProtect,
  removeFile,
  sendFileCollection
} from "../controllers/collection.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware("collection"));

// { success: boolean; createDate: string }
router.get("/create", generate); // change to post
// {
//   success: boolean;
//   items?: CollectionComponentProps;
//   createDate?: string;
//   name?: string;
//   isLocked?: boolean;
// }
router.post("/open", sendFileCollection);
// {
//   success: boolean;
// }
router.post("/auth", auth);
// { success: boolean }
router.post("/lock", passwordProtect);

// TODO: maybe delete
router.delete("/delete", deleteCollection);

// { success: boolean; name?: string }
router.post("/changeName", changeName);

// { success: boolean; newFileItem: Item }
router.post("/add", addFile);
// { success: boolean; fileId: string }
router.delete("/remove", removeFile);

// { success: boolean; accountName?: string }
router.post("/addUser", addUser);

// { success: boolean; accountName?: string }
router.post("/removeUser", removeUser);

export default router;
