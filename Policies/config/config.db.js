import {secrets} from "./config.secrets.js";
import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async () => {
    try {
        console.log(secrets.MONGODB_CONNSTRING.green.bold.underline)
        await mongoose.connect(secrets.MONGODB_CONNSTRING)
    } catch (error) {
        console.error(` --- Error on connectDB function in the config.db.js file : ${error.message}`.red.underline.bold)
        throw new Error(`Error on connectDB function in the config.db.js file : ${error.message}`.red.underline.bold)
    }
}

export default connectDB

