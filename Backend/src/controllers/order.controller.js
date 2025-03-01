import { User } from "../models/user.model.js"
import Order from "../models/order.model.js"
import Stripe from 'stripe'

// global variables
const currency = 'usd'
const deliveryCharges = 10

//gateway initialization

const stripe = new Stripe("sk_test_51QxShQEfKrINT6FQWRgfacPVXUXTEPyfSLF9rUhYtUGGqv7EvS2AUOsW9Ibub7b8hH8RppYzvJcon1KZIaZW6E2100juf8JbNq")


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
    try {
        const buyer = req.user._id
        const {items, amount, address, seller} = req.body
        const {origin} = req.headers
        const orderData = {
            buyer,
            seller,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: "false",
            date : Date.now()
        }

        const newOrder = new Order(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data : {
                currency : currency,
                product_data : {
                    name: item.name
                },
                unit_amount : item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name: 'Delivery Charges'
                },
                unit_amount : deliveryCharges * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment',
        })

        res.json({success:true, session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

const verifyStripe = async(req,res) => {
    const {orderId, success} = req.body
    const userId = req.user._id

    try {
        if (success === "true"){
            await Order.findById(orderId, {payment : true})
            await User.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true})
        } else{
            await Order.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
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
    updateStatus,
    verifyStripe
}