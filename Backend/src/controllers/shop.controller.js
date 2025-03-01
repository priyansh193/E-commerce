import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from '../utils/asyncHandler.js'
import { Shop } from "../models/shop.model.js";
import jwt from 'jsonwebtoken' 
import mongoose, {isValidObjectId} from "mongoose"

const generateAccessAndRefreshTokens = async(shopId) => {
    try {
        const shop = await Shop.findById(shopId)

        const accessToken = shop.generateAccessToken()
        const refreshToken = shop.generateRefreshToken()

        shop.refreshToken = refreshToken
        await shop.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error)
        return res.json({success : false, message : error.message})
    }
}

const registerShop = asyncHandler(async (req,res) => {
    const {name, email, password, Address} = req.body

    if (
        [name,email,password,Address].some((field) => field?.trim() === "")
    ){
        return res.json({success:false, message:"All fields are required"})
    }

    const shop = await Shop.create({
        name,
        email,
        password,
        Address
    })

    const createdShop = await Shop.findById(shop._id).select(
        "-password"
    )

    if (!createdShop) {
        return res.json({success: false, message : "Something went wrong while regestiring the shop"})
    }

    return res.status(201).json(
        new ApiResponse(200, createdShop, "Shop registered Successfully")
    )
    
})

const loginShop = asyncHandler(async (req,res) => {
    const {email, password} = req.body

    if (!email || !password){
        return res.json({success: true, message: "email and password are required"})
    }

    const shop = await Shop.findOne({email})

    if (!shop){
        return res.json({success: false, message: "Shop dosen't exist"})
    }

    const isPasswordValid = await shop.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res.json({success:false, message:"Invalid password"})
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(shop._id)

    const loggedInShop = await Shop.findById(shop._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                shop: loggedInShop, accessToken, refreshToken
            },
            "Shop logged In Successfully"
        )
    )
})

const logoutShop = asyncHandler(async (req,res) => {
    await Shop.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Shop logged Out"))
})

const getShopProducts = asyncHandler(async (req,res) => {
    const shop = await Shop.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.shop._id)
            }
        },
        {
            $lookup : {
                from : "products",
                localField : "_id",
                foreignField : "owner",
                as : "Product",
                pipeline: [
                    {
                        $project : {
                            name:1,
                            price:1,
                            image:1,
                            category:1,
                            subCategory:1,
                        }
                    }
                ]
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            shop[0].Product,
            "Shop Products fetched successfully"
        )
    )

})

const getShopOrders = asyncHandler(async (req,res) => {
    const shop = await Shop.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.shop._id)
            }
        },
        {
            $lookup: {
                from: "orders",
                localField : "_id",
                foreignField : "seller",
                as : "Orders",
                pipeline : [
                    {
                        $project : {
                            buyer : 1,
                            items : 1,
                            amount : 1,
                            address : 1,
                            status : 1,
                            paymentMethod : 1,
                            payment : 1,
                            date : 1,
                        }
                    }
                ]
            }
        }
    ])
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            shop[0].Orders,
            "Shop Products fetched successfully"
        )
    )
})

export {
    registerShop,
    loginShop,
    logoutShop,
    getShopProducts,
    getShopOrders
}