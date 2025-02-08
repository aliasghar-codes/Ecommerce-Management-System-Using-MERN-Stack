import { Router } from "express";
import adminAuth from "../Middlewares/adminAuth.middleware.js"
import userAuth from "../Middlewares/auth.middleware.js"
import { userContact } from "../Controllers/contact.controller.js"
import {
    getMessages,
    deleteMessage,
    deleteMessages,

} from "../Controllers/contact.controller.js";

const router = Router();

router.route("/").post(userAuth, userContact);

router.route("/get-all").get(adminAuth, getMessages);

router.route("/delete/:id").delete(adminAuth, deleteMessage);

router.route("/delete").post(adminAuth, deleteMessages);


export default router;