import "@fastify/jwt";
import { FastifyRequest, FastifyReply } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    jwt: {
      sign: <T extends object>(payload: T, options?: any) => string;
      verify: <T extends object>(token: string) => T;
    };
    authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}
