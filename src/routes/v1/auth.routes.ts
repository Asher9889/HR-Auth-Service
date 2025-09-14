import { FastifyInstance } from "fastify";
import { authController } from "../../controllers";
import { createTenantSchema } from "../../utils/validations/auth/auth.validation";

export default async function authRoutes(app:FastifyInstance){
    app.post("/", { schema: createTenantSchema }, authController.signup)
}