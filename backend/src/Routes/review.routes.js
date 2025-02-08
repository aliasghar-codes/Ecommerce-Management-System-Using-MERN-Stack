import { Router } from "express"
import userAuth from "../Middlewares/auth.middleware.js"
import {
    getAllProductReviews,
    createReview

} from "../Controllers/review.controller.js"

const router = Router();

router.route("/all/:productId").get(getAllProductReviews);

router.route("/add").post(userAuth, createReview);

export default router;