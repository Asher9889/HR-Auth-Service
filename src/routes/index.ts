import { FastifyInstance } from "fastify";
import v1Routes from "./v1";
// import v2Routes from "./v2";

export default async function routes(app: FastifyInstance) {
  app.register(v1Routes, { prefix: "/v1" });
//   app.register(v2Routes, { prefix: "/v2" });
}
