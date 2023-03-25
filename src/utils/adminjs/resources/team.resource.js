const Team = require("../../../models/Team")
const { hash } = require("../../bcrypt")
const { UserEnum } = require("../../enum")

const team = {
    resource: Team,
    options: {
        properties: {
            userType: {
                isVisible: false
            },
            password: {
                type: "password"
            }
        },
        actions: {
            edit: {
                before: async(req)=>{
                    req.payload.userType = UserEnum.TEAM
                    req.payload.password = await hash(req.payload?.password||'password') 
                    return req
                }
            },
            new: {
                before: async(req)=>{
                    req.payload.userType = UserEnum.TEAM
                    req.payload.password = await hash(req.payload?.password||'password') 
                    return req
                }
            }
        },
    }
}

module.export = team