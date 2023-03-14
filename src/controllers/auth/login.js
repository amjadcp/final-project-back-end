const { generateAPIError } = require("../../errors/apiError");
const {errorWrapper} = require("../../middleware/errorWrapper");
const { generateAPIError } = require("../../errors/apiError");
const { RoleEnum } = require("../../utils/enum");
const User = require('../../models/User')
const { compare } = require("../../utils/bcrypt");
const { signAccessKey } = require("../../utils/key");

const adminLogin = errorWrapper(async (req, res, next) => {
    const { email, password } = req.body
    const admin = await User.findOne({ email, role: { "$in": [RoleEnum.ADMIN] } })
    if(admin && await compare(password, admin.password)===true){
        
        const accessKey = signAccessKey({
            id: admin._id
        }, process.env.ACCESS_SECRET)

        return res.status(200).json({
            success: true,
            message: 'sucessfully loggedin',
            data: {
                userId: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                accessKey
            }
        })
    }else return next(generateAPIError('Invalid email id or password', 400))
})

module.exports = {
    adminLogin
}