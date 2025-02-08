import { Router } from "express";
import { loginUser, registerUser, logoutUser } from "../Controllers/user.controller.js";

const router = Router();

router.route("/login").post(loginUser);

router.route("/register").post(registerUser);

router.route("/logout").get(logoutUser);

export default router;