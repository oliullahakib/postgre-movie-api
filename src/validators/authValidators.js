import {z} from 'zod';

export const registerSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string({ message: 'Password must be a string' }).min(4, { message: 'Password must be at least 6 characters long' }),
})

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string({message:'Password must be a string'}).min(4, { message: 'Password must be at least 6 characters long' }),
})