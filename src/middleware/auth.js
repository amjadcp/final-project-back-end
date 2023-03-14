const { generateAPIError } = require("../errors/apiError")
const User = require("../models/User")
const { RoleEnum } = require("../utils/enum")
const { verifyAccessKey } = require("../utils/key")
const {errorWrapper} = require("./errorWrapper")

const auth = (roles = Object.values(RoleEnum)) => {
    if (typeof roles === 'string') roles = [roles] // if the param is not an array set the string inside the array

    return errorWrapper(async(req, res, next) => {
        // console.log(req.headers['user-agent']);
        const accessKey = req.headers.authorization && req.headers.authorization.split(" ")[1]
        if (accessKey == null) return next(generateAPIError('Key unavailable', 401))
        const payload = verifyAccessKey(accessKey, process.env.ACCESS_SECRET)
        let user
        if(payload) user = await User.findOne({_id: payload.id}).select("name email role")

        if (user) next()
        else return next(generateAPIError('Unauthorized', 401))
    })

}

module.exports = {
    auth
}