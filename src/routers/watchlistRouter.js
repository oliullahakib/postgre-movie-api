import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addToWatchlist } from "../controllers/watchlistController.js";


const router = Router();
// middleware
router.use(authMiddleware);
// routes
router.post("/", addToWatchlist);

export default router