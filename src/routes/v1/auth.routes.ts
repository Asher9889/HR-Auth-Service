import { FastifyInstance } from "fastify";
import { authController } from "../../controllers";

export default async function authRoutes(app:FastifyInstance){
    app.post("/", authController.signup)
}