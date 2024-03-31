const mongoose = require("mongoose");

const connectDB = (url, dbName)=> {
    return mongoose.connect(url, {
        dbName: dbName
    })
}

module.exports = connectDB

