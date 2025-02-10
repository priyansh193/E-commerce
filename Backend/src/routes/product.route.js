import {addProduct, listProduct, removeProduct, singleProduct} from '../controllers/product.controller.js'
import { Router } from 'express'
import {upload} from "../middleware/multer.middleware.js"
import { verifyShopjwt } from '../middleware/adminAuth.middleware.js'

const router = Router()

router.use(verifyShopjwt)

router.route("/addproduct").post(upload.fields([
    {name : 'image1', maxCount:1},
    {name : 'image2', maxCount:1},
    {name : 'image3', maxCount:1},
    {name : 'image4', maxCount:1},
]) , addProduct)

router.route("/list").get(listProduct)
router.route("/delete").post(removeProduct)
router.route("/singleProduct").post(singleProduct)

export default router