declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      MONGO_USER: string;
      MONGO_PASS: string;
      MONGO_HOST: string;
      MONGO_DB_Name: string;
      MONGO_APPNAME: string;
      ACCESS_TOKEN_SECRET: string;
      REFRESH_TOKEN_SECRET: string;
      ACCESS_TOKEN_EXPIRES_IN: string;
      REFRESH_TOKEN_EXPIRES_IN: string;
      COOKIE_SECRET: string;
    };
  }
}

const envSchema = {
  type: 'object',
  required: ['PORT', "MONGO_USER", "MONGO_PASS", "MONGO_HOST", "MONGO_DB_Name", "MONGO_APPNAME", "ACCESS_TOKEN_SECRET", "REFRESH_TOKEN_SECRET", "ACCESS_TOKEN_EXPIRES_IN", "REFRESH_TOKEN_EXPIRES_IN", "COOKIE_SECRET"],
  properties: {
    PORT: {
      type: 'number',
    },
    MONGO_USER: {
      type: 'string',
    },
    MONGO_PASS: {
      type: 'string',
    },
    MONGO_HOST: {
      type: 'string',
    },
    MONGO_DB_Name: {
      type: 'string',
    },
    MONGO_APPNAME: {
      type: 'string',
    },
    ACCESS_TOKEN_SECRET: {
      type: 'string',
    },
    REFRESH_TOKEN_SECRET: {
      type: 'string',
    },
    ACCESS_TOKEN_EXPIRES_IN: {
      type: 'string',
    },
    REFRESH_TOKEN_EXPIRES_IN: {
      type: 'string',
    },
    COOKIE_SECRET: {
      type: 'string',
    },
  }
}

const envOptions = {
  confKey: 'config', // optional, default: 'config'
  schema: envSchema,
  dotenv: true    // pick .env file from root of the project
  // dotenv: { path: path.join(import.meta.dirname, "../../.env")}
}

export { envOptions }