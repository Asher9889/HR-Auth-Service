import { FastifyRequest, FastifyReply } from "fastify";
import { Tenant } from "../models";
import { ApiErrorResponse, authMsg, jwt } from "../utils";
import { StatusCodes } from "http-status-codes";
import User from "../models/user.model";
import { authService } from "../services";
import { authTypes } from "../types";


async function signup (req:FastifyRequest, res:FastifyReply){
    try {
        const body = req.body as authTypes.ICreateTenantBody
        const {savedTenant, savedUser} = await authService.signup(req,body);
       
        // 5. Generate JWT
        // const token = jwt.sign(
        //   { userId: user._id, tenantId: tenant._id, role: user.role },
        //   process.env.JWT_SECRET as string,
        //   { expiresIn: "1d" }
        // );
        const payload = { userId: savedUser._id.toString(), tenantId: savedTenant._id.toString(), role: savedUser.role };
        const token = jwt.generateTokens(req.server, payload);
        
        return res.code(StatusCodes.CREATED).send({ savedTenant, savedUser, token });
  
       
      } catch (err) {
        req.log.error(err);
        return res.code(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error" });
      }
}

export { signup }