import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowerCase: true
    },
    phone: {
        type: Number,
    },
    message: {
        type: String,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);