import asyncHandler from "../Utils/asyncHandler.js";
import orderModel from "../Models/order.model.js";
import apiResponse from "../Utils/apiResponse.js";

export const createBill = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        name,
        emailAddress,
        phone,
        dateOfBirth,
        gender,
        address,
        city,
        state,
        zipCode,
        totalAmount,
        paymentMethod,
        products
    } = req.body;

    const newBill = await orderModel.create({
        userId,
        name,
        emailAddress,
        phone,
        dateOfBirth,
        gender,
        address,
        city,
        state,
        zipCode,
        totalAmount,
        paymentMethod,
        products
    })

    return res.status(200).json(new apiResponse(200, newBill, "Order placed successfully"));
});

export const getBills = asyncHandler(async (_, res) => {
    const allBills = await orderModel.find();

    return res.status(200).json(new apiResponse(200, allBills, "Bills fetched successfully"));
});

export const updateBills = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    await orderModel.findByIdAndUpdate(id, { status });

    return res.status(200).json(new apiResponse(200, {}, "Status updated successfully"));
});