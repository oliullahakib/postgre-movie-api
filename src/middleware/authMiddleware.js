import jwt from "jsonwebtoken"
import { prisma } from "../config/db.js";
const authMiddleware = async (req,res,next)=>{
    console.log("token",req.headers.authorization)
    console.log("cookie",req.cookies?.jwt_token)
    
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
token = req.headers.authorization.split(' ')[1]
} else if(req.cookies?.jwt_token){
token = req.cookies.jwt_token
} 
if(!token){
    return res.status(401).json({message: "Unauthorized"})
}
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user =  await prisma.user.findUnique({
        where:{id:decoded.id}
    })
    if(!user){
        return res.status(401).json({message: "Unauthorized"})
    }
    req.user = user
    next()
} catch (error) {
    return res.status(401).json({message: "Unauthorized"})
}
};  

export default authMiddleware;