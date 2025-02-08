import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const sellerSchema = new Schema({

    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "owner"
    },
    products: []

}, { timestamps: true });

sellerSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();

});

sellerSchema.methods.comparePassword = async function(password) {

    return await bcrypt.compare(password, this.password);

};

sellerSchema.methods.generateAccessToken = function() {

    return jwt.sign({
        userName: this.userName,
        email: this.email,
        _id: this._id
    },

    process.env.ACCESS_TOKEN_SECRET,

    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY 
    }
)};

export default mongoose.model("Seller", sellerSchema);