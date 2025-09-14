const isProd = process.env.NODE_ENV === "production";
const pinoPrettyLoggerOptions =  {
    logger: isProd
      ? {
          level: "info",
          redact: ["req.headers.authorization", "req.headers.cookie"], // hide sensitive info
        }
      : {
          level: "debug",
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,           // colored output
              translateTime: "HH:MM:ss", // human-readable timestamps
              ignore: "pid,hostname",    // cleaner logs
            },
          },
        },
};

export default pinoPrettyLoggerOptions;

