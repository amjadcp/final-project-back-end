const { generateAPIError } = require("../errors/apiError")
const Student = require("../models/Student")
const Team = require("../models/Team")
const User = require("../models/User")
const { TeamRoleEnum, StudentRoleEnum, UserEnum } = require("../utils/enum")
const { verifyAccessKey } = require("../utils/key")
const {errorWrapper} = require("./errorWrapper")

const auth = (roles = []) => {
    if (typeof roles === 'string') roles = [roles] // if the param is not an array set the string inside the array

    return errorWrapper(async(req, res, next) => {
        // console.log(req.headers['user-agent']);
        const accessKey = req.headers.authorization && req.headers.authorization.split(" ")[1]
        if (accessKey == null) return next(generateAPIError('Key unavailable', 401))
        const payload = verifyAccessKey(accessKey, process.env.JWT_SECRET)
        let user
        if(payload?.userType===UserEnum.STUDENT) user = await Student.findOne({_id: payload.id}).select("name email role")
        else if(payload?.userType===UserEnum.TEAM) user = await Team.findOne({_id: payload.id}).select("name email role")
        if (user && (roles.indexOf(user.role)!==-1 || roles.length===0)){
            req.user = user
            next()
        }
        else return next(generateAPIError('Unauthorized', 401))
    })

}

module.exports = {
    auth
}