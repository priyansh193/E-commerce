import express from 'express'
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/order.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'
import {verifyShopjwt} from '../middleware/adminAuth.middleware.js'



const router = express.Router()


router.post('/list', verifyShopjwt, allOrders)
router.post('/status', updateStatus)


router.post('/place',verifyJWT, placeOrder)
router.post('/stripe',verifyJWT, placeOrderStripe)


router.post('/userorders', verifyJWT, userOrders)
router.post('/verify', verifyJWT, verifyStripe)

export default router