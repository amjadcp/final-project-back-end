const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const { Database, Resource } = require("@adminjs/mongoose");
const { hash } = require('../bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Student = require('../../models/Student');
const Team = require('../../models/Team');
const Broadcast = require('../../models/Broadcast');
const { UserEnum } = require('../enum');

AdminJS.registerAdapter({
	Database,
	Resource
})

const admin = new AdminJS({
    resources: [
        {
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
        }, 
        {
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
        }, 
        {
            resource: Broadcast,
        }, 
    ],
})

const DEFAULT_ADMIN = {
    email: 'admin@example.com',
    password: 'password',
}
const authenticate = async (email, password) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
}

// const adminRouter = AdminJSExpress.buildRouter(admin)
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    null
    // session({
    //   store: MongoStore.create({ url: "mongodb+srv://alumni:alumni@cluster0.kg6fvid.mongodb.net/final_project?retryWrites=true&w=majority" }),
    //   resave: false,
    //   saveUninitialized: false,
    //   secret: 'sessionsecret',
    //   cookie: {
    //     httpOnly: process.env.NODE_ENV === 'production',
    //     secure: process.env.NODE_ENV === 'production',
    //   },
    //   name: 'admin',
    // })
  )

module.exports={
    adminRootPath: admin.options.rootPath,
    adminRouter
}



//   const ConnectSession = Connect(session)
//   const sessionStore = new ConnectSession({
//     conObject: {
//       connectionString: 'postgres://adminjs:adminjs@localhost:5435/adminjs',
//       ssl: process.env.NODE_ENV === 'production',
//     },
//     tableName: 'session',
//     createTableIfMissing: true,
//   })


