import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new Schema({

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
        default: "admin"
    }

}, { timestamps: true });

adminSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();

});

adminSchema.methods.comparePassword = async function(password) {

    return await bcrypt.compare(password, this.password);

};

adminSchema.methods.generateAccessToken = function() {

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

export default mongoose.model("Admin", adminSchema);