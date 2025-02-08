import categoryModel from "../Models/category.model.js";
import apiResponse from "../Utils/apiResponse.js"
import asyncHandler from "../Utils/asyncHandler.js"

export const addCategory = asyncHandler(async (req, res) => {
    const { name, description, subCategory } = req.body;

    if (!name)
        return res.status(400).json(new apiResponse(400, {}, "Please provide category name"));

    const categoryExists = await categoryModel.findOne({ name });

    if (categoryExists)
        return res.status(400).json(new apiResponse(401, {}, "Category already exists"));

    const newCategory = await categoryModel.create({
        name,
        description,
        subCategory
    });

    return res.status(200).json(new apiResponse(200, newCategory, "Category created successfully"));
});

export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const categoryExists = await categoryModel.findById(id);

    if (!categoryExists)
        return res.status(400).json(new apiResponse(400, {}, "Category don't exists"));

    await categoryModel.findByIdAndDelete(id);

    const category = await categoryModel.findById(id);

    if (category)
        return res.status(500).json(new apiResponse(500, {}, "Internal server error"));

    return res.status(200).json(new apiResponse(200, {}, "Category deleted successfully"));
});

export const getCategories = asyncHandler(async (_, res) => {
    const allCategories = await categoryModel.find();

    return res
        .status(200)
        .json(new apiResponse(200, allCategories, "Categories fetched successfully"));
});