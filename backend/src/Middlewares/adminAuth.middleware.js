import adminModel from "../Models/admin.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import apiResponse from "../Utils/apiResponse.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler( async (req, res, next) => {
    
    try {
        const token = req.cookies?.adminToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            return res.status(401).json(new apiResponse(401, {}, "Unauthorized request"));
        };
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const admin = await adminModel.findById(decodedToken?._id).select("-password");
    
        if(!admin){
            return res.status(401).json(new apiResponse(401, {}, "Invalid admin token"));
        };
    
        req.user = admin;
        next();

    } catch (error) {
        return res.status(401).json(new apiResponse(401, {}, error?.message || "Invalid admin token"));
    }
})

export default verifyJWT;