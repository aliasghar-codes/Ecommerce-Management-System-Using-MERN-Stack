import { Router } from "express"
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import { createCoupon, getAllCoupons, deleteCoupon } from "../Controllers/coupon.controller.js";

const router = Router();

router.route("/create").post(adminAuth, createCoupon);

router.route("/delete/:id").delete(adminAuth, deleteCoupon);

router.route("/get-all").get(adminAuth, getAllCoupons);

export default router;