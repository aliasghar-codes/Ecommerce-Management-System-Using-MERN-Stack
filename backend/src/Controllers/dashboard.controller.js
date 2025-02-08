import asyncHandler from "../Utils/asyncHandler.js"
import apiResponse from "../Utils/apiResponse.js"
import billModel from "../Models/order.model.js"
import userModel from "../Models/user.model.js"
import productModel from "../Models/product.model.js"
import contactModel from "../Models/contact.model.js"
import couponModel from "../Models/coupon.model.js"

export const dashboardInfo = asyncHandler(async (req, res) => {
    const totalSignup = await userModel.countDocuments({});
    const ordersPending = await billModel.countDocuments({status: "pending"});
    const totalProducts = await productModel.countDocuments({});
    const totalMessages = await contactModel.countDocuments({});
    const activeCoupons = await couponModel.countDocuments({});
    let totalSale = 0;

    const completedBills = await billModel.find({status: "completed"});
    for(let bill of completedBills){
        totalSale += bill.totalAmount;
    }

    const dataToSend = {
        totalSignup,
        ordersPending,
        totalProducts,
        totalMessages,
        activeCoupons,
        totalSale
    }
    
    return res.status(200).json(new apiResponse(200, dataToSend, "Data fetched successfully"))
});