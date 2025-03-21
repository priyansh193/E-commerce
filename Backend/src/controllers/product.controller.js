import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from '../utils/asyncHandler.js'
import {Product} from '../models/product.model.js'
import {v2 as cloudinary} from 'cloudinary'
import { isValidObjectId } from "mongoose";

const addProduct = asyncHandler(async (req,res) => {
    const {name, description, price, category, subCategory, sizes} = req.body

    if (
        [name, description, price, category, subCategory].some((field) => field?.trim() === "")
    ) {
        return res.json({success:false, message:"All fields are required"})
    }

    const existedProduct = await Product.findOne({
        $and: [{ name: name }, { owner: req.shop._id }],
      });

    if (existedProduct) {
        return res.json({success : false, message : "Product with same name already exist"})
    }

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    
    const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

    let imageUrl = [];

    try {
        imageUrl = await Promise.all(
            images.map((item) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary Upload Error:", error);
                                reject(error);
                            } else {
                                resolve(result.secure_url);
                            }
                        }
                    );
                    uploadStream.end(item.buffer); 
                });
            })
    );
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(500).json({ success: false, message: "Image upload failed", error });
    }


    const product = await Product.create({
        name,
        description,
        category,
        price: Number(price),
        owner : req.shop._id,
        subCategory,
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
        return res.json({sucess : false, message: "invalid product Id"})
    }


    const product = await Product.findById(productId)
    if (!product) {
        return res.json({success: false, message : "No such product exist"})
    }
  
    if (JSON.stringify(product.owner) !== JSON.stringify(req.shop._id)){
        return res.json({success : false, message: "You are Not allowed to remove this Product"})
    }

    const removedProduct = await Product.findByIdAndDelete(productId)

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

