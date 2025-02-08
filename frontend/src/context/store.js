import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.js"

export default configureStore({
    reducer: authReducer
});