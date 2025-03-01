import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const shopSchema = new Schema (
    {
        name : {
            type : String,
            required : true,

        },
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        Address : {
            type: String,
            required: true
        }
    }
)

shopSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

shopSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

shopSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
shopSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

shopSchema.plugin(mongooseAggregatePaginate)

export const Shop = mongoose.model("Shop", shopSchema)