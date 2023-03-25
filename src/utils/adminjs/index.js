const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const { Database, Resource } = require("@adminjs/mongoose");
const User = require("../../models/User");
const Achievement = require("../../models/Achievement");
const { hash } = require('../bcrypt');
const passwordsFeature = require("@adminjs/passwords")
AdminJS.registerAdapter({
	Database,
	Resource
})
const admin = new AdminJS({
    resources: [
        {
            resource: User,
            options: {
                properties: {
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
                            console.log(req.payload.password);
                            req.payload.password = await hash(req.payload?.password||'password') 
                            return req
                        }
                    },
                    new: {
                        before: async(req)=>{
                            console.log(req.payload.password);
                            req.payload.password = await hash(req.payload?.password||'password') 
                            return req
                        }
                    }
                },
            }
        }, 
        Achievement
    ],
})

const adminRouter = AdminJSExpress.buildRouter(admin)

module.exports={
    adminRootPath: admin.options.rootPath,
    adminRouter
}
