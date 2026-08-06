import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addToWatchlist } from "../controllers/watchlistController.js";
import{addToWatchlistSchema} from "../validators/watchlistValidators.js";
import { validateRequest } from "../middleware/validateRequest.js";

const router = Router();
// middleware
router.use(authMiddleware);
// routes
router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);

export default router