const mongoose = require("mongoose");

module.exports.connect = () => {
    // mongoose.set('strictQuery', false);
    const db = process.env.DATABASE;
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    }).then(console.log('Connected to db')).catch((err) => console.log(err))

}