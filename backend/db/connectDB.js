const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected successfully")
    } catch(e){
        console.log("Error connecting to database: ", e);
    }
}

module.exports = connectDB;