import mongoose from "mongoose";

export const connectDB = async () => {
    try {
         await mongoose.connect(process.env.MONGO_URI!);
         const connection = mongoose.connection;
         connection.on("connected", () => {
            console.log("MongoDB connected");
        })

        connection.on("error", (error) => {
            console.error(`MongoDB connection error please check:`);
            process.exit();
        })
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
        process.exit();
    }
}