import { Router } from "express";
import { showAll } from "../controllers/showAll.controller";

const router = Router();

router.post("/all", showAll);

export default router;
