import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from './routes/user.route.js'
import productRouter from "./routes/product.route.js"
import cartRouter from "./routes/cart.route.js"
import orderRouter from './routes/order.route.js'
import shopRouter from './routes/shop.route.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/products", productRouter)
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/shop", shopRouter)

export { app }

