const { generateAPIError } = require("../../errors/apiError");
const { errorWrapper } = require("../../middleware/errorWrapper");
const User = require("../../models/User");
const { RoleEnum } = require("../../utils/enum");

const addTeam =(role)=>{
    return errorWrapper(async(req, res)=>{
        // if the function param "role" not a vaild one
        if(Object.values(RoleEnum).indexOf(role)===-1) return next(generateAPIError('Not a valid role', 400))

        // team will be array of User documents ( role will be the parm "role" )
        // TODO: Need write to set password
        let {team} = req.body
        for(let i=0; i<team.length; i++) team[i].role = role

        const users = await User.insertMany(team) // save in db
        return res.status(201).json({
            success: true,
            message: "members added to the team", // members may be student, alumini, faculty or admin
            data: users
        })
    })
}


module.exports = {
    addTeam
}