import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema (
    {
        name : {
            type : String,
            required : true,
        },
        description : {
            type : String,
            required : true,
        },
        price : {
            type : Number,
            required : true,
        },
        image : {
            type : Array,
            required : true,
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "Shop"
        },
        category : {
            type : String,
            required : true,
        },
        subCategory : {
            type : String,
            required : true,
        },
        sizes : {
            type : Array,
            require : true,
        },
        bestSeller : {
            type : Boolean
        },
        date : {
            type : Number,
            required : true,
        }

    }
)

export const Product = mongoose.model("Product", productSchema)