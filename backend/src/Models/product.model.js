import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    quantity: {
        type: Number,
        default: 0
    },
    size: {
        type: String
    },
    gender: {
        type: String
    },
    colors: [String],
    images: [String]

}, { timestamps: true });

export default mongoose.model("Product", productSchema);