import mongoose, { Schema } from "mongoose"

const categorySchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "This category has no description"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }

}, { timestamps: true });

export default mongoose.model("Category", categorySchema)