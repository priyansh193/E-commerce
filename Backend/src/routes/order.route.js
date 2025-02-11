import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/order.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'
import {verifyShopjwt} from '../middleware/adminAuth.middleware.js'



const router = express.Router()


router.post('/list', verifyShopjwt, allOrders)
router.post('/status', updateStatus)


router.post('/place',verifyJWT, placeOrder)
router.post('/stripe', placeOrderStripe)
router.post('/razorpay', placeOrderRazorpay)

router.post('/userorders', verifyJWT, userOrders)

export default router