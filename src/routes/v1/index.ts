import { FastifyInstance } from "fastify";
import authRoutes from "./auth.routes";

export default function v1Routes (app:FastifyInstance){
    app.register(authRoutes, { prefix: "/auth" })
}