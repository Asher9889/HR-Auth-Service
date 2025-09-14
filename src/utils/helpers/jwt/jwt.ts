import { FastifyInstance } from "fastify";
import { jwtTypes } from "../../../types";

const generateTokens = (
  fastify: FastifyInstance,
  payload: jwtTypes.JWTPayload
) => {
  // Access Token (short-lived)
  const accessToken = fastify.jwt.sign(payload, { expiresIn: "15m" });

  // Refresh Token (long-lived)
  const refreshToken = fastify.jwt.sign(payload, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

const verifyToken = async (
  fastify: FastifyInstance,
  token: string
): Promise<jwtTypes.JWTPayload | null> => {
  try {
    return fastify.jwt.verify<jwtTypes.JWTPayload>(token);
  } catch (err) {
    return null;
  }
};

export { generateTokens, verifyToken };

