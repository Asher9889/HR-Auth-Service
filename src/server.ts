import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import { envOptions } from "./config/index";


const app = Fastify({ logger: true });

async function startServer() {
  await app.register(fastifyEnv, envOptions);
  await app.ready(); //

  // app.route("/")

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






