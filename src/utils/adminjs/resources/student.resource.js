const Student = require("../../../models/Student")
const { hash } = require("../../bcrypt")
const { UserEnum } = require("../../enum")

const student = {
    resource: Student,
    options: {
        properties: {
            userType: {
                isVisible: false
            },
            "batch.period": {
                description: "2020-23"
            },
            password: {
                type: "password"
            }
        },
        actions: {
            edit: {
                before: async(req)=>{
                    req.payload.userType = UserEnum.STUDENT
                    req.payload.password = await hash(req.payload?.password||'password') 
                    return req
                }
            },
            new: {
                before: async(req)=>{
                    req.payload.userType = UserEnum.STUDENT
                    req.payload.password = await hash(req.payload?.password||'password') 
                    return req
                }
            }
        },
    }
}

module.exports = student