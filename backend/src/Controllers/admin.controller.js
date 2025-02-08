import adminModel from "../Models/admin.model.js"
import asyncHandler from "../Utils/asyncHandler.js"
import apiResponse from "../Utils/apiResponse.js"
import userModel from "../Models/user.model.js"

const options = {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
    maxAge: 172800000
}

export const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(new apiResponse(400, {}, "Please fill full form"))
    };

    const adminExists = await adminModel.findOne({ email });

    if (!adminExists) {
        return res.status(400).json(new apiResponse(400, {}, "Email or Password is incorrect"));
    };

    const passwordMatch = adminExists.comparePassword(password);

    if (!passwordMatch) {
        return res.status(400).json(new apiResponse(400, {}, "Email or Password is incorrect"));
    };

    const admin = await adminModel.findById(adminExists._id).select("-password");

    const adminToken = adminExists.generateAccessToken();

    const data = {
        admin,
        token: adminToken
    };

    return res
        .status(200)
        .cookie("adminToken", adminToken, options)
        .json(new apiResponse(200, data, "Admin logged in successfully"));
});

export const registerAdmin = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));

    const adminExists = await adminModel.findOne({ email });

    if (adminExists) return res.status(400).json(new apiResponse(400, {}, "Admin already registered"));

    const userExists = await userModel.findOne({ email });

    if (userExists) return res.status(400).json(new apiResponse(400, {}, "User already registered"))

    const newAdmin = await adminModel.create({ userName, email, password });

    const createdAdmin = await adminModel.findById(newAdmin._id).select("-password");

    if (!createdAdmin) {
        return res.status(500).json(new apiResponse(500, {}, "Error while registering admin"));
    };

    return res
        .status(200)
        .json(new apiResponse(200, createdAdmin, "Admin registered successfully"));

});
