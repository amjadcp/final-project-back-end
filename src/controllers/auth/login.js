const { generateAPIError } = require("../../errors/apiError");
const {errorWrapper} = require("../../middleware/errorWrapper");
const { RoleEnum, UserEnum } = require("../../utils/enum");
const User = require('../../models/User')
const { compare } = require("../../utils/bcrypt");
const { signAccessKey } = require("../../utils/key");
const Student = require("../../models/Student");
const Team = require("../../models/Team");

// here pass the role
const login = (userType)=>{
    return errorWrapper(async (req, res, next) => {
        const { email, password } = req.body
        let user

        if(userType===UserEnum.STUDENT) user = await Student.findOne({ email})
        else if(userType===UserEnum.TEAM) user = await Team.findOne({ email})
        console.log(user);
        if(user && await compare(password, user.password)===true){
            
            const accessKey = signAccessKey({
                id: user._id,
                userType
            }, process.env.JWT_SECRET)
    
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