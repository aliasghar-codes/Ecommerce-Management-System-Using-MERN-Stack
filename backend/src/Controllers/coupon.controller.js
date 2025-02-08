import couponModel from "../Models/coupon.model.js"
import apiResponse from "../Utils/apiResponse.js"
import asyncHandler from "../Utils/asyncHandler.js"

export const createCoupon = asyncHandler(async (req, res) => {
    const { code, discountPercentage, startDate, endDate } = req.body;

    if (!code || !discountPercentage || !endDate)
        return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));

    const couponExists = await couponModel.findOne({ code });

    if(couponExists)
        return res.status(400).json(new apiResponse(400, {}, "Coupon with this code already exists"));

    const newCoupon = await couponModel.create({
        code, 
        discountPercentage, 
        startDate, 
        endDate
    });

    return res.status(200).json(new apiResponse(200, newCoupon, "Coupon created successfully"));

});

export const getAllCoupons = asyncHandler(async (_, res) => {
    const allCoupons = await couponModel.find();

    return res.status(200).json(new apiResponse(200, allCoupons, "Coupons fetched successfully"))
});

export const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if(!id)
        return res.status(400).json(new apiResponse(400, {}, "Coupon don't exists"));

    const couponExists = await couponModel.findById(id);

    if(!couponExists)
        return res.status(400).json(new apiResponse(400, {}, "Coupon don't exists"));

    await couponModel.findByIdAndDelete(id);

    return res.status(200).json(new apiResponse(200, {}, "Coupon deleted successfully"));
});