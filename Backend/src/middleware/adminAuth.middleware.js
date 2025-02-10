import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import {Shop} from '../models/shop.model.js'


export const verifyShopjwt = async (req,res, next) => {
    try {
        const {token} = req.headers
        console.log(token)

        if (!token) {
            return res.json({success:false, message: "Unauthorized request"})
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
        const shop = await Shop.findById(decodedToken?._id).select("-password -refreshToken")

        if (!shop) {
            
            return res.json({success:false, message:"Invalid Token"})
        }

        req.shop = shop;
        next()
    } catch (error) {
        return res.json({success:false, message:  error?.message || "Invalid access token"})
    }
}