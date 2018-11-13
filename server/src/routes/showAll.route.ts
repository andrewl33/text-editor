import { Router } from "express";
import { showAll } from "../controllers/showAll.controller";

const router = Router();

router.get("/all", showAll);

export default router;
