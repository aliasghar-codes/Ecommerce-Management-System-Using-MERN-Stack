import contactModel from "../Models/contact.model.js"
import apiResponse from "../Utils/apiResponse.js"
import asyncHandler from "../Utils/asyncHandler.js"

export const userContact = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (
        !name || !email || !message
    ) {
        return res.status(400).json(new apiResponse(400, {}, "Please fill full form"));
    };

    const sentMessage = await contactModel.create({
        name,
        email,
        phone,
        message
    });

    return res
        .status(200)
        .json(new apiResponse(200, sentMessage, "Message sent successfully"));

});

export const getMessages = asyncHandler(async (_, res) => {
    const messages = await contactModel.find();

    return res.status(200).json(new apiResponse(200, messages, "Messages fetched successfully"));
});

export const deleteMessage = asyncHandler(async (req, res) => {
    const id = req.params.id;

    await contactModel.findByIdAndDelete(id);

    const messageExists = await contactModel.findById(id);

    if (messageExists)
        return res.status(500).json(new apiResponse(500, {}, "Error occured while deleting message."));

    return res.status(200).json(new apiResponse(200, {}, "Message Deleted successfully"));
});

export const deleteMessages = asyncHandler(async (req, res) => {
    const { data } = req.body;

    data.forEach(async id => {
        await contactModel.findByIdAndDelete(id);

        const messageExists = await contactModel.findById(id);

        if (messageExists)
            return res.status(500).json(new apiResponse(500, {}, "Error occured while deleting message."));
    })

    return res.status(200).json(new apiResponse(200, {}, "Messages Deleted successfully"));
});