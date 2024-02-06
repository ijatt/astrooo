import mongoose from "mongoose";

export default async () => {
    try {
        await mongoose.connect(useRuntimeConfig().MONGO_URI)
        console.log("MongoDB connected")
    } catch (error) {
        console.log("MongoDB connection failed")
    }
}