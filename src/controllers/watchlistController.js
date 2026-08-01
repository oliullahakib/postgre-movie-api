import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;
    if (!movieId) {
        return res.status(400).json({ error: "Movie ID is required" });
    }
    try {
        const movieExist = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        if (!movieExist) {
            return res.status(404).json({ error: "Movie not found" });
        }
        const movieAlreadyExist = await prisma.watchlistItem.findUnique({
            where: { userId_movieId: { userId: req.user.id, movieId: movieId } }
        })
        if (movieAlreadyExist) {
            return res.status(400).json({ error: "Movie already exist in watchlist" });
        }
        const addtowatchlist = await prisma.watchlistItem.create({
            data: {
                userId: req.user.id,
                movieId: movieId,
                status: status || "PLANNED",
                rating: rating,
                notes: notes
            }
        })
        res.status(201).json({
            message: "Movie added to watchlist successfully",
            data: { addtowatchlist },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
}

