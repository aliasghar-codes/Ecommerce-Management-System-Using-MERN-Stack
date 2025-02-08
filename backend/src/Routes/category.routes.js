import { Router } from "express";
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import {
    addCategory,
    deleteCategory,
    getCategories,
} from "../Controllers/category.controller.js";

const router = Router();

router.route("/create").post(adminAuth, addCategory);

router.route("/delete/:id").delete(adminAuth, deleteCategory);

router.route("/get-all").get(adminAuth, getCategories);

export default router;