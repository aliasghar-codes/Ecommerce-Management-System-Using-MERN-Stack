import { Router } from "express"
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import {
    addProduct,
    deleteProduct,
    getProducts,
    getJustForYouProducts,
    getComputerComponents,
    getExploreProducts,
    getProductDetail,
    getRelatedProducts,
    searchProducts,
    searchProductsByCategory

} from "../Controllers/product.controller.js";

const router = Router();

// Admin
router.route("/create").post(adminAuth, addProduct);

router.route("/delete/:id").delete(adminAuth, deleteProduct);

router.route("/list").get(adminAuth, getProducts);

// Clients
router.route("/just-for-you").get(getJustForYouProducts);

router.route("/computer-components").get(getComputerComponents);

router.route("/explore-products").get(getExploreProducts);

router.route("/detail/:productId").get(getProductDetail);

router.route("/related-products/:categoryId").get(getRelatedProducts);

router.route("/find").get(searchProducts);

router.route("/find/:category").get(searchProductsByCategory);

export default router;