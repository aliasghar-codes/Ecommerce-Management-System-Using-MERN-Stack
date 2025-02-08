import mongoose, { Schema } from "mongoose"

const couponSchema = new Schema({

    code: {
        type: String,
        required: true
    },
    discountPercentage: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);