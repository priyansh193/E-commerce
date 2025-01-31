import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"


export const adminAuth = asyncHandler(async (req,res, next) => {
    try {
        const token = req.header

        if (!token) {
            return res.json({success:false, message: "Unauthorized request"})
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
        if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message: "not authorized login again"})
        }
        next()
    } catch (error) {
        return res.json({success:false, message:  "error?.message" || "Invalid access token"})
    }
})