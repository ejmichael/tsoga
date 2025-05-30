const mongoose = require('mongoose')

const connectToMongoDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'tsoga'
        });
        console.log("Connected to MongDB" + `${connect.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongDB", error);
        process.exit(1)
        
    }
}

module.exports = connectToMongoDB;