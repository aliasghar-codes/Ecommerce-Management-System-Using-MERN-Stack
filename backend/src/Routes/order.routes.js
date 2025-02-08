import { Router } from "express"
import userAuth from "../Middlewares/auth.middleware.js"
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import { 
    createBill,
    getBills,
    updateBills

} from "../Controllers/order.controller.js"

const router = Router();

router.route("/create").post(userAuth, createBill);

router.route("/get-all").get(adminAuth, getBills);

router.route("/update-status/:id").post(adminAuth, updateBills);

export default router;