const { generateAPIError } = require("../../errors/apiError");
const errorWrapper = require("../../middleware/errorWrapper");

module.exports.login = errorWrapper(async(req, res, next)=>{
    // logic


    // success response like 200, 201

    // return res.status(200).json({
    //     success: true,
    //     message: "a message",
    //     data: null
    // })


    // err response like 500, 404, 403, 401
    // return next(generateAPIError('some err', 400))
})