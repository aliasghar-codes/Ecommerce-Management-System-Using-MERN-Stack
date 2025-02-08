import userModel from "../Models/user.model.js"
import contactModel from "../Models/contact.model.js"
import asyncHandler from "../Utils/asyncHandler.js"
import apiResponse from "../Utils/apiResponse.js"

const options = {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 172800000
};

export const loginUser = asyncHandler(async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));
        };

        const userExists = await userModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json(new apiResponse(400, {}, "User with this email don't exists"));
        };

        const passwordMatch = userExists.comparePassword(password);

        if (!passwordMatch) {
            return res.status(401).json(new apiResponse(401, {}, "Invalid credentials"));
        };

        const user = await userModel.findById(userExists._id).select("-password")

        const token = userExists.generateAccessToken();

        const data = {
            user,
            token
        };

        return res
            .status(200)
            .cookie("accessToken", token, options)
            .json(new apiResponse(200, data, "Loggedin successfully"));
    } catch (error) {
        return res.status(500).json(new apiResponse(500, {}, "Internal server error"));
    }
});

export const registerUser = asyncHandler(async (req, res) => {

    try {
        const {

            userName,
            email,
            password,

        } = req.body;

        if (
            !userName ||
            !email ||
            !password
        ) {
            return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));
        };

        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json(new apiResponse(400, {}, "User already registered"));
        };

        const newUser = await userModel.create({
            userName,
            email,
            password
        });

        const createdUser = await userModel.findById(newUser._id).select("-password");

        if (!createdUser) {
            return res.status(400).json(new apiResponse(400, {}, "Error occured while registering user"));
        };

        const token = createdUser.generateAccessToken();

        const data = {
            user: createdUser,
            token
        }

        return res
            .status(200)
            .cookie("accessToken", token, options)
            .json(new apiResponse(200, data, "User registered successfully"));
    } catch (error) {
        return res.status(400).json(new apiResponse(400, {}, "Error occured while registering user"));
    };
});

export const logoutUser = asyncHandler(async (_, res) => {

    return res
        .status(200)
        .clearCookie("accessToken", {})
        .clearCookie("adminToken", {})
        .clearCookie("ownerToken", {})
        .json(new apiResponse(200, {}, "User logged out successfully"));

});
