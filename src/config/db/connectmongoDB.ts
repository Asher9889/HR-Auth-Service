import mongoose, { Connection } from "mongoose";
// import { config } from "../config/index";
import { ApiErrorResponse } from "../../utils";
import { StatusCodes } from "http-status-codes";
import { FastifyInstance } from "fastify";

async function connectMongoDB(app:FastifyInstance): Promise<Connection | undefined> {
    try {
        const FULL_URI = `mongodb+srv://${(app.config.MONGO_USER)}:${(app.config.MONGO_PASS)}@${app.config.MONGO_HOST}/${app.config.MONGO_DB_Name}?retryWrites=true&w=majority&appName=${app.config.MONGO_APPNAME}`;
        await mongoose.connect(FULL_URI);
        const connection = mongoose.connection;
        console.log(`MongoDB connected to ${connection.name} database`);
        return connection;
    } catch (error) {
        console.error(error)
        app.log.error(error)
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to connect to MongoDb");
    }
}

mongoose.connection.on("connecting", () => {
    console.log("trying to connect");
});

mongoose.connection.on("connected", () => {
    console.log("Successfully connected");
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

export default connectMongoDB;