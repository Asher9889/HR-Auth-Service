import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { connectMongoDB, envOptions } from "./config/index";
import routes from "./routes";
import { jwtPlugin } from "./plugins";

const app = Fastify({ logger: true });

async function startServer() {
  await app.register(fastifyEnv, envOptions);
  await connectMongoDB(app)
  await app.register(jwtPlugin);
  await app.register(routes, { prefix: "/api" });
  
  // await app.ready(); //  Fastify will call .ready() internally before listen
  app.listen({ port: app.config.PORT }, (err, address) => {
    if (err) {
      console.error(err);
      app.log.error(err)
      process.exit(1);
    }
    console.log(`Server listening on ${address}`);
    app.log.info(`Server working ${address}`)
  });
}

startServer()






