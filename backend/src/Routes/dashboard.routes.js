import { Router } from "express";
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import {
    dashboardInfo

} from "../Controllers/dashboard.controller.js"

const router = Router();

router.route("/get-info").get(adminAuth, dashboardInfo)

export default router