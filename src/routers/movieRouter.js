import { Router } from "express";
import { getAllMovies } from "../controllers/movieController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);
router.get("/", getAllMovies);

export default router