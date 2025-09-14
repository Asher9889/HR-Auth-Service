import argon2 from "argon2";
import { FastifyInstance } from "fastify";

// Hash a password
async function hashPassword(password: string): Promise<string> {
  return await argon2.hash(password
//     , {
//     type: argon2.argon2id, // best balance of security
//     memoryCost: 2 ** 16,   // ~64 MB
//     timeCost: 3,           // iterations
//     parallelism: 1,        // threads
//   }
);
}

// Verify a password
async function verifyPassword(
  hashedPassword: string,
  plainPassword: string
): Promise<boolean> {
  return await argon2.verify(hashedPassword, plainPassword);
}

export { hashPassword, verifyPassword };
