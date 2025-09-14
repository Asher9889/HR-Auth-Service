import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { ApiErrorResponse } from "../../index";


export default function globalErrorHandler(err: FastifyError, req: FastifyRequest, res: FastifyReply) {
    req.log.error(err);

  // Handle known API errors
  if (err instanceof ApiErrorResponse) {
    return res.code(err.statusCode).send(new ApiErrorResponse(err.statusCode, err.message));
  }

  // Handle generic / unexpected errors
  return res.code(500).send(new ApiErrorResponse(500, err.message));
}
