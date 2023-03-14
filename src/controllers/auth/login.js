const { generateAPIError } = require("../../errors/apiError");
const {errorWrapper} = require("../../middleware/errorWrapper");
const { RoleEnum } = require("../../utils/enum");
const User = require('../../models/User')
const { compare } = require("../../utils/bcrypt");
const { signAccessKey } = require("../../utils/key");

// here pass the role
const login = (roles)=>{
    if (typeof roles === 'string') roles = [roles] // if the param is not an array set the string inside the array

    return errorWrapper(async (req, res, next) => {
        const { email, password } = req.body
        const user = await User.findOne({ email, role: {"$in": roles} })
        if(user && await compare(password, user.password)===true){
            
            const accessKey = signAccessKey({
                id: user._id
            }, process.env.ACCESS_SECRET)
    
            return res.status(200).json({
                success: true,
                message: 'sucessfully loggedin',
                data: {
                    userId: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    accessKey
                }
            })
        }else return next(generateAPIError('Invalid email id or password', 400))
    })
}


module.exports = {
    login
}