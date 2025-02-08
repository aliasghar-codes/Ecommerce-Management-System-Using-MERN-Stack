import reviewModel from "../Models/review.model.js"
import asyncHandler from "../Utils/asyncHandler.js"
import apiResponse from "../Utils/apiResponse.js"

export const getAllProductReviews = asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const reviews = await reviewModel.find({ productId });

    if(reviews.length < 1)
        return res.status(200).json(new apiResponse(200, {}, "No reviews found"))

    return res.status(200).json(new apiResponse(200, reviews, "Reviews fetched successfully"));
});

export const createReview = asyncHandler(async (req, res) => {
    const {
        productId,
        name,
        rating,
        reviewText
    } = req.body;

    const userId = req.user._id;

    if(
        !userId ||
        !productId ||
        !name ||
        !rating ||
        !reviewText
    )
        return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));
    

    const reviewExists = await reviewModel.findOne({ userId, productId });

    if(reviewExists)
        return res.status(400).json(new apiResponse(400, {}, "Review already exists"));

    const newReview = await reviewModel.create({
        userId,
        productId,
        name,
        rating,
        reviewText
    });

    return res.status(200).json(new apiResponse(200, newReview, "Review added successfully"));
})