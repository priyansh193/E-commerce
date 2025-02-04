import express from 'express'
import { addToCart, updateCart, getUserCart } from "../controllers/cart.cotroller.js";
import { Router } from 'express';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router()

router.route('/get').post(verifyJWT, getUserCart)
router.route('/add').post(verifyJWT, addToCart)
router.route('/update').post(verifyJWT, updateCart)

export default router