import { Router } from "express";
import { createSale, getSales } from "../controllers/salesController.js";

const router: Router = Router();

router.post("/", createSale);
router.get("/", getSales);

export default router;
