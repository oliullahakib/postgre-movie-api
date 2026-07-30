import bcrypt from 'bcrypt';
import { prisma } from '../config/db.js';
import generateToken from '../utils/generateToken.js';
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

export const login = async(req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})
    }

    // Check if user email exists in the table
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password,user.password);
     if(!isPasswordValid){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const data = {
        id:user.id,
        email:user.email
    }
    const token =  generateToken(user.id,res);
    res.status(200).json({message:"Login successful", data,token}); 
}


export const logout = (res)=>{
    res.clearCookie('jwt_token');
    res.status(200).json({message:"Logout successful"});
}