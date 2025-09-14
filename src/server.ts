import Fastify from "fastify";
import fastifyEnv from "@fastify/env";
import type { FastifyCookieOptions } from '@fastify/cookie'
import cookie from '@fastify/cookie'
import { connectMongoDB, envOptions } from "./config/index";
import routes from "./routes";
import { jwtPlugin } from "./plugins";
import { globalErrorHandler } from "./utils";
import { pinoPrettyLoggerOptions } from "./utils/index";

const app = Fastify(pinoPrettyLoggerOptions); // logger

app.setErrorHandler(globalErrorHandler); // global error handler



async function startServer() {
  await app.register(fastifyEnv, envOptions); // env load
  await connectMongoDB(app) 
  await app.register(jwtPlugin); 
  await app.register(cookie, {
    secret: app.config.COOKIE_SECRET, // for cookies signature
    parseOptions: {}     // options for parsing cookies
  } as FastifyCookieOptions)
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






