import { User } from "../models/user.model.js"



const addToCart = async (req,res) => {
    try {
        const {itemId, size} = req.body

        const userData = await User.findById(req.user._id)

        let cartData = await userData.cartData

        if (cartData[itemId]){
            if (cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1
            }
        }
        else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        await User.findByIdAndUpdate(req.user._id, {cartData})

        return res.json({success : true, message : "Added To cart"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const updateCart = async (req,res) => {
    try {
        const {itemId, size, quantity} = req.body
        
        const userData = await User.findById(req.user._id)

        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(req.user._id, {cartData})

        return res.json({success : true, message : "Cart updated"})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

const getUserCart = async (req,res) => {
        try {
            const userData = await User.findById(req.user._id)
            
            let cartData = await userData.cartData

            res.json({success:true, cartData})
    
            
        } catch (error) {
            console.log(error)
            res.json({success:false, message: error.message})
        }
        
}

export {
    addToCart,
    updateCart,
    getUserCart
}