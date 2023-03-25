const { generateAPIError } = require("../../errors/apiError");
const {errorWrapper} = require("../../middleware/errorWrapper");
const Student = require('../../models/Student')
const { compare, hash } = require("../../utils/bcrypt");
const { UserEnum } = require("../../utils/enum");
const { signAccessKey } = require("../../utils/key");

// student signup
const signup = errorWrapper(async(req, res, next)=>{
    const {name, batchPeriod, email, whatsAppNumber, password, pronounce} = req.body
    await Student.create({
        name, 
        batchPeriod, 
        email, 
        whatsAppNumber, 
        password: await hash(password), 
        pronounce,
        userType: UserEnum.STUDENT
    })
    return res.status(201).json({
        success: true,
        message: "student account created",
        data: null
    })
})


module.exports = {
    signup
}