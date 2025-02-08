import productModel from "../Models/product.model.js"
import categoryModel from "../Models/category.model.js"
import apiResponse from "../Utils/apiResponse.js"
import asyncHandler from "../Utils/asyncHandler.js"
import fs from "fs"
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addProduct = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        quantity,
        size,
        gender,
        colors
    } = req.body;

    const imagesArray = [];

    let images;

    for (let key in req.files) {
        images = req.files[key]
    }

    if (!Array.isArray(images) || images.length < 2)
        return res.status(400).json(new apiResponse(400, {}, "Product must contain atleast two images"))

    if (!name || !description || !price || !quantity)
        return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));

    const productExists = await productModel.findOne({ name });

    if (productExists)
        return res.status(400).json(new apiResponse(400, {}, "Product with this name already exists"));

    const uploadDir = path.join(__dirname, "../../public/images/");

    images.forEach(img => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const finalPath = path.join(uploadDir, `${uniqueSuffix}-${img.name}`);

        img.mv(finalPath, error => {
            if (error)
                return res.status(500).json(new apiResponse(500, {}, "Error occured while uploading files"));
        })

        const indexOfPublic = finalPath.indexOf("images");
        const pathToStore = finalPath.substring(indexOfPublic);
        const cleanedPath = pathToStore.replaceAll("\\", "/");
        imagesArray.push(cleanedPath);
    });

    const newProduct = await productModel.create({
        name,
        description,
        price,
        category,
        quantity,
        size,
        gender,
        colors: JSON.parse(colors),
        images: imagesArray
    });

    res.status(200).json(new apiResponse(200, newProduct, "Product created successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tempPath = path.join(__dirname, "../../public/");
    const imagesPath = tempPath.replaceAll("\\", "/");

    if(!id){
        return res.status(400).json(new apiResponse(400, {}, "No id found"))}

    const product = await productModel.findById(id); 

    if(!product){
        return res.status(400).json(new apiResponse(400, {}, "No product found with this id"))}

    product.images.forEach(img => {
        fs.unlink(`${imagesPath}${img}`, error => {
            if(error)
                return res.status(500).json(new apiResponse(500, {}, "Internal server error"));
        })
    });

    await productModel.findByIdAndDelete(id);

    return res.status(200).json(new apiResponse(200, {}, "Product deleted successfully"));
});

export const getProducts = asyncHandler(async (_, res) => {
    const products = await productModel.find();

    return res
            .status(200)
            .json(new apiResponse(200, products, "Products fetched successfully"));
});

export const getJustForYouProducts = asyncHandler(async (_, res) => {

    const category = await categoryModel.findOne({ name: "home" });

    const products = await productModel.find({ category: category._id })
                            .sort({ createdAt: -1 })
                            .limit(4) 
                            .exec(); 

    return res.status(200).json(new apiResponse(200, products, "Products fetched successfully"));
});

export const getComputerComponents = asyncHandler(async (_, res) => {

    const category = await categoryModel.findOne({ name: "computer" });

    const products = await productModel.find({ category: category._id })
                            .sort({ createdAt: -1 })
                            .limit(4) 
                            .exec(); 

    return res.status(200).json(new apiResponse(200, products, "Products fetched successfully"));
});

export const getExploreProducts = asyncHandler(async (_, res) => {

    const categoriesToFind = ["sports", "mobile phones", "male", "female"];
    const categoryIds = [];
    const productsToSend = [];
    
    for (const category of categoriesToFind) {
        const categoryDoc = await categoryModel.findOne({ name: category });
        categoryIds.push(categoryDoc?._id);
    }

    for(const categoryId of categoryIds){
        const products = await productModel.find({ category: categoryId })
                            .sort({ createdAt: -1 })
                            .limit(2) 
                            .exec();

        products.forEach(product => {
            productsToSend.push(product)
        });
    };

    return res.status(200).json(new apiResponse(200, productsToSend, "Products fetched successfully"));

});

export const getProductDetail = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const product = await productModel.findById(productId);

    return res.status(200).json(new apiResponse(200, product, "Product fectched successfully"));

});

export const getRelatedProducts = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const products = await productModel.find({ category: categoryId }).limit(4).exec();

    if(products.length < 1)
        return res.status(200).json(new apiResponse(200, products, "No related Products found"));

    return res.status(200).json(new apiResponse(200, products, "Products fetched successfully"));
});

export const searchProducts = asyncHandler(async (req, res) => {
    const { name } = req.query;

    const regex = new RegExp(name, "i");

    const products = await productModel.find({ name: regex });

    return res.status(200).json(new apiResponse(200, products, "Products fetched successfully"))
}); 

export const searchProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const regex = new RegExp(category, "i");

    const categories = await categoryModel.find({ name: regex });

    const productsToSend = [];

    for(let category of categories){
        const products = await productModel.find({ category: category._id })
        for(let product of products){
            productsToSend.push(product)
        }
    }

    return res.status(200).json(new apiResponse(200, productsToSend, "Products fetched successfully"))
});