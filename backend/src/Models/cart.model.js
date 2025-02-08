import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({

    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    priceOfSingleProduct: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const cartSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [ productSchema ]

}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);