const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URI

async function ConnectDb() {
    let res = await mongoose.connect(uri)
    if (res) {
        console.log("Database connected successfully")
        return;
    }

    console.log("Database is not connected successfully")

}

module.exports = ConnectDb;