declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      // DATABASE_URL: string;
    };
  }
}

const envSchema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'number',
    }
  }
}

const envOptions = {
  confKey: 'config', // optional, default: 'config'
  schema: envSchema,
  dotenv: true    // pick .env file from root of the project
  // dotenv: { path: path.join(import.meta.dirname, "../../.env")}
}

export { envOptions }