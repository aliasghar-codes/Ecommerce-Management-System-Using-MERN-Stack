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
    priceOfSingleProduct: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const orderSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    dateOfBirth: {
        type: String,
    },
    gender: {
        type: String,
        enum: [ "Male", "Female", "Other" ]
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [ "pending", "shipped", "completed", "canceled" ],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        default: "Cash on delivery"
    },
    products: [ productSchema ]

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);