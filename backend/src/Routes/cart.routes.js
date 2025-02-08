import { Router } from "express"
import userAuth from "../Middlewares/auth.middleware.js"
import { 
    addToCart,
    cartDetail,
    itemDelete,
    cartUpdate,
    EmptyCart,

} from "../Controllers/cart.controller.js"

const router = Router();

router.route("/add").post(userAuth, addToCart);

router.route("/detail").get(userAuth, cartDetail);

router.route("/delete/:productId").delete(userAuth, itemDelete);

router.route("/delete-all").delete(userAuth, EmptyCart);

router.route("/update").post(userAuth, cartUpdate);

export default router;