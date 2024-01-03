const mongoose = require('mongoose');
const MONGODB_URL = "mongodb+srv://manushi2003:Epilogue123@cluster0.g6tdeyo.mongodb.net/employee"

const connectDb = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log(`MongoDb server connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDb server not connected ${error}`)
    }
}

module.exports = connectDb