import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use('/images', express.static('public/images'));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(fileUpload());

import userRouter from "./Routes/user.routes.js";
import adminRouter from "./Routes/admin.routes.js";
import productRouter from "./Routes/product.routes.js";
import categoryRouter from "./Routes/category.routes.js";
import contactRouter from "./Routes/contact.routes.js";
import dashboardRouter from "./Routes/dashboard.routes.js";
import couponRouter from "./Routes/coupon.routes.js";
import reviewRouter from "./Routes/review.routes.js";
import cartRouter from "./Routes/cart.routes.js";
import orderRouter from "./Routes/order.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/bill", orderRouter);

export default app;