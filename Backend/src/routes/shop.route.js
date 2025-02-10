import { registerShop, loginShop, logoutShop } from "../controllers/shop.controller.js";
import { Router } from "express";
import { verifyShopjwt } from "../middleware/adminAuth.middleware.js";

const router = Router()

router.route('/register').post(registerShop)
router.route('/login').post(loginShop)
router.route('/logout').post(verifyShopjwt, logoutShop)

export default router