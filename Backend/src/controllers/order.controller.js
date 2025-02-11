import { User } from "../models/user.model.js"
import Order from "../models/order.model.js"

const placeOrder = async (req,res) => {
    try {
        const buyer = req.user._id
        const {items, amount, address, seller} = req.body

        const orderData = {
            buyer,
            seller,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: "false",
            date : Date.now()
        }
        const newOrder = new Order(orderData)
        await newOrder.save()

        await User.findByIdAndUpdate(buyer, {cartData : {}})

        res.json({success : true, message : "Order Placed"})

    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

const placeOrderStripe = async (req,res) => {

}

const placeOrderRazorpay = async (req,res) => {

}

const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({ seller : req.shop._id })
        res.json({success : true, orders})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const userOrders = async (req,res) => {
    try {
        const userId = req.user._id
        console.log(userId)
    
        const orders = await Order.find( {buyer : userId} )
        console.log(orders)
        res.json({success : true, orders})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

const updateStatus = async (req,res) => {
    try {
        
        const {orderId, status} = req.body
        await Order.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message: "status updated"})

    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message})
    }
}

export {
    placeOrder,
    placeOrderStripe,
    placeOrderRazorpay,
    allOrders,
    userOrders,
    updateStatus
}