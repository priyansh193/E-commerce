import { registerShop, loginShop, logoutShop, getShopProducts, getShopOrders } from "../controllers/shop.controller.js";
import { Router } from "express";
import { verifyShopjwt } from "../middleware/adminAuth.middleware.js";

const router = Router()

router.route('/register').post(registerShop)
router.route('/login').post(loginShop)
router.route('/logout').post(verifyShopjwt, logoutShop)
router.route('/getProducts').post(verifyShopjwt, getShopProducts)
router.route('/getOrders').post(verifyShopjwt, getShopOrders)

export default router