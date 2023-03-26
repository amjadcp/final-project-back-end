const { generateAPIError } = require("../../errors/apiError");
const { errorWrapper } = require("../../middleware/errorWrapper");
const Student = require("../../models/Student");
const Team = require("../../models/Team");
const { UserEnum } = require("../../utils/enum");


const getProfile = (userType)=>{
    return errorWrapper(async(req, res, next)=>{
        let user

        if(userType===UserEnum.STUDENT) user = await Student.findOne({_id: req.user.id})
        else if(userType===UserEnum.TEAM) user = await Team.findOne({ _id: req.user.id})

        if(!user) return next(generateAPIError('User not found', 404))

        return res.status(200).json({
            success: true,
            message: "profile fetch successfuly",
            data: user
        })
    })
}

const editProfile = (userType)=>{
    return errorWrapper(async(req, res, next)=>{
        let user

        if(userType===UserEnum.STUDENT) user = await Student.findOneAndUpdate({_id: req.user.id}, {...req.body})
        else if(userType===UserEnum.TEAM) user = await Team.findOneAndUpdate({ _id: req.user.id}, {...req.body})

        if(!user) return next(generateAPIError('User not found', 404))

        return res.status(200).json({
            success: true,
            message: "profile edited successfuly",
            data: null
        })

    })
}


module.exports = {
    getProfile,
    editProfile
}