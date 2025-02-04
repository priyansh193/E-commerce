import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(async (req,res, next) => {
    try {
        const {token} = req.headers

        if (!token) {
            return res.json({success:false, message: "Unauthorized request"})
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            
            return res.json({success:false, message:"Invalid Token"})
        }
    
        req.user = user;
        next()
    } catch (error) {
        return res.json({success:false, message:  error?.message || "Invalid access token"})
    }
})