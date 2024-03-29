const mongoose = require("mongoose");

const connect = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb is connected");
    } catch (error) {
        console.log("ERROR: ", error);
        throw new Error;
    }
}

module.exports = connect;