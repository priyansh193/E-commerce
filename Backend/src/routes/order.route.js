import express from 'express'
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/order.controller.js'
import { adminAuth } from '../middleware/adminAuth.middleware.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/list', adminAuth, allOrders)
router.post('/status', adminAuth, updateStatus)


router.post('/place',verifyJWT, placeOrder)
router.post('/stripe',verifyJWT, placeOrderStripe)
router.post('/razorpay',verifyJWT, placeOrderRazorpay)

router.post('/userorders', verifyJWT, userOrders)

export default router