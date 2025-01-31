import { registerUser,
        loginUser,
        logoutUser,
        adminLogin
} from "../controllers/user.controller.js";
import Router from 'express'
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/admin").post(adminLogin)

export default router