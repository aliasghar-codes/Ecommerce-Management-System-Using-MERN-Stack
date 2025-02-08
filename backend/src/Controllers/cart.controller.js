import asyncHandler from "../Utils/asyncHandler.js";
import cartModel from "../Models/cart.model.js";
import apiResponse from "../Utils/apiResponse.js";


export const addToCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const {
        quantity,
        productId,
        color,
        priceOfSingleProduct,
        totalPrice,
        name,
        image
    } = req.body;                     

    let userCartExists = await cartModel.findOne({ userId });

    if (userCartExists) {

        for(const product of userCartExists.products){
            if(product.productId == productId){
                return res.status(200).json(new apiResponse(200, {}, "Item already exists"));
            }
        }

        userCartExists.products.push({
            productId,
            quantity,
            color,
            priceOfSingleProduct,
            totalPrice,
            name,
            image
        });

        await userCartExists.save();
    } else {
        await cartModel.create({
            userId,
            products: [{
                productId,
                quantity,
                color,
                priceOfSingleProduct,
                totalPrice,
                name,
                image
            }]
        })
    }

    return res.status(200).json(new apiResponse(200, {}, "Item added successfully"));
});

export const cartDetail = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userCart = await cartModel.findOne({ userId });

    if(!userCart)
        return res.status(200).json(new apiResponse(200, {}, "No products found"));

    return res.status(200).json(new apiResponse(200, userCart.products, "Products fetched successfully"));
});

export const cartUpdate = asyncHandler(async (req, res) => {
    const { data } = req.body;
    const userId = req.user._id;

    const userCart = await cartModel.findOne({ userId });

    userCart.products = data;

    await userCart.save();

    return res.status(200).json(new apiResponse(200, {}, "Cart updated successfully"));
});

export const EmptyCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const userCart = await cartModel.findOne({userId});

    userCart.products = [];

    await userCart.save();

    return res.status(200).json(new apiResponse(200, {}, "Cart items deleted successfully"));
});

export const itemDelete = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id;

    const userCart = await cartModel.findOne({userId});

    if(!userCart)
        return res.status(400).json(new apiResponse(400, {}, "Product not found in the card"));

    userCart.products = userCart.products.filter(product => {
        return product.productId != productId
    });

    await userCart.save(); 

    return res.status(200).json(new apiResponse(200, userCart, "Product deleted successfully"));
});