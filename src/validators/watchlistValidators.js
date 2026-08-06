import {z} from 'zod';
export const addToWatchlistSchema = z.object({
movieId: z.string().uuid(),
status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED','DROPPED'],{message:'Status must be from Planned, Watching, Completed or Dropped'}).optional(),
rating: z.number().int().min(1,{message:'Rating must be a number between 1 and 10'}).max(10,{message:'Rating must be a number between 1 and 10'}).optional(),
note: z.string().optional()
})