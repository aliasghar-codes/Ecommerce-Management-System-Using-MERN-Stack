import userModel from "../Models/user.model.js";
import asyncHandler from "../Utils/asyncHandler.js";
import apiResponse from "../Utils/apiResponse.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler( async (req, res, next) => {
    
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            return res.status(401).json(new apiResponse(401, {}, "Unauthorized request"));
        };
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await userModel.findById(decodedToken?._id).select("-password");
    
        if(!user){
            return res.status(401).json(new apiResponse(401, {}, "Invalid access token"));
        };
    
        req.user = user;
        
        next();

    } catch (error) {
        return res.status(401).json(new apiResponse(401, {}, error?.message || "Invalid access token"))
    }
})

export default verifyJWT;