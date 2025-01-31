import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from '../utils/asyncHandler.js'
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async(userId) => {
    try {
        const user = await User.findById(userId)
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


const registerUser = asyncHandler (async (req,res) => {
    const {name,email,password} = req.body;

    if (
        [name,email,password].some((field) => field?.trim() === "")
    ){
        return res.json({success:false, message:"All fields are required"})
    }

    const existedUser = await User.findOne({email})
    if (existedUser){
        return res.json({success:false, message:"User already exist"})
    }

    const user = await User.create({
        name,
        email, 
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

const loginUser = asyncHandler (async (req,res) => {
    const {email, password} = req.body

    if (
        [email,password].some((field) => field?.trim() === "")
    ){
        return res.json({success:false, message:"All fields are required"})
    }

    const user = await User.findOne({email})

    if (!user){
        return res.json({success:false, message:"User with this email do not exist"})
    }

    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        return res.json({success:false, message:"Invalid password"})
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

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
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
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
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const adminLogin = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(email+password, process.env.REFRESH_TOKEN_SECRET)
        res.json({success:true, token})
    }
    else{
        res.json({success:false, message: "invalid credentials"})
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    adminLogin
}