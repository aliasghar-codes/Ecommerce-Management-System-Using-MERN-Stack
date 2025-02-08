const asyncHandler = asyncFunction => async (req, res, next) => {
    try {

        return await asyncFunction(req, res, next);

    } catch (error) {

        console.log("Error occured: ", error);

        return res.status(error.code || 500).json({
            success: false,
            message: error.message
        });
    };
};


export default asyncHandler;
