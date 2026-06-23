import dotenv from "dotenv"
import mongoose from "mongoose";


dotenv.config()

async function connectingDB() {
    try {
        const connectDB = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("MongoDb is Connected SuccessFully !")
    } catch (error) {
        console.error(error,"ERROR While connecting to the MongoDB")
    }

}

export default connectingDB;