import { Router } from "express";
import {
  addFile as addUser,
  removeFile as removeUser
} from "../controllers/account.controller";
import {
  addTag,
  changeName,
  generate,
  open,
  passwordProtect,
  removeFile,
  removeTag,
  save
} from "../controllers/file.controller";
import { auth as authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware("file"));

/**
 * {success: boolean}
 */
router.get("/generate", generate); // change to post
// {
//   success: boolean;
//   body?: {
//     name: string;
//     codeText: string;
//     tags: string[];
//     createDate: string;
//   };
// }

// TODO:
router.post("/open", open);
/**
 * { success: boolean; codeText: string }
 */
router.put("/save", save);
// { success: boolean; message: string }
// router.post("/auth", auth);
// { success: boolean; message: string }
router.post("/lock", passwordProtect);
router.delete("/delete", removeFile);

// file tag

// { success: boolean; name?: string }
router.post("/addTag", addTag);
// { success: boolean; name?: string }

router.post("/updateName", changeName);
router.delete("/removeTag", removeTag);

// {
//   success: boolean;
//   accountName?: string;
// };
router.post("/addUser", addUser);

// {
//   success: boolean;
//   accountName?: string;
// };
router.post("/removeUser", removeUser);
export default router;
