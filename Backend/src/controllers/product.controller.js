import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from '../utils/asyncHandler.js'
import {Product} from '../models/product.model.js'
import {v2 as cloudinary} from 'cloudinary'
import { isValidObjectId } from "mongoose";

const addProduct = asyncHandler(async (req,res) => {
    const {name, description, price, category, subCategory, sizes, bestSeller} = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    
    const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

    let imageUrl = await Promise.all(
        images.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
            return result.secure_url
        })
    )
    console.log(imageUrl)

    const product = await Product.create({
        name,
        description,
        category,
        price: Number(price),
        subCategory,
        bestSeller : bestSeller === "true" ? true : false,
        sizes: JSON.parse(sizes),
        image: imageUrl,
        date : Date.now()
    })
    
    if (!product) {
        return res.json({success:false, message : "Something went wrong while creating the product"})
    }
    
    return res.status(201).json(
        new ApiResponse(200, product, "product created Successfully")
    )
})

const listProduct = asyncHandler(async (req,res) => {
    const products = await Product.find({})

    return res
        .status(200)
        .json(new ApiResponse(200, products, "product list fetched sucessfully"))
})

const removeProduct = asyncHandler(async (req,res) => {
    const {productId} = req.body

    if (!isValidObjectId(productId)){
        return res.json({success:false, message : "Invalid Product Id"})
    }

    const remove = await Product.findByIdAndDelete(
        productId
    )

    return res
        .status(200)
        .json(new ApiResponse(200, "product removed sucessfully"))

})

const singleProduct = asyncHandler(async (req,res) => {
    const {productId} = req.body

    const product = await Product.findById(productId)
    return res
        .status(200)
        .json(new ApiResponse(200, product, "product fetched Successfully"))
})


export {
    addProduct,
    listProduct,
    removeProduct,
    singleProduct    
}

