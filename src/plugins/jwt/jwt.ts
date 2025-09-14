// plugins/jwt.ts
import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const jwtPlugin = fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || "supersecret",
    sign: { expiresIn: "15m" }, // default for access token
  });

  fastify.decorate(
    "authenticate",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        await req.jwtVerify();
      } catch (err) {
        res.code(401).send({ error: "Unauthorized" });
      }
    }
  );
});

export default jwtPlugin;
