import { StatusCodes } from "http-status-codes";
import { Tenant, User } from "../models";
import { authTypes } from "../types";
import { ApiErrorResponse, authMsg, USER_CONSTANTS } from "../utils";
import { jwt } from "../utils";
import { FastifyRequest } from "fastify";


export async function signup(req:FastifyRequest, body:authTypes.ICreateTenantBody){
    try {
        const {firstName, lastName, email, password, companyName, domain} = body;
        // 1. Check if tenant already exists
        const existingTenant = await Tenant.findOne({ $or: [{ domain }, { "contact.email": email }] });
        if (existingTenant) {
            throw new ApiErrorResponse(StatusCodes.CONFLICT, authMsg.exist);
        }
        // 2. Create tenant
        const adminName = firstName + " " + lastName;
        const tenant = new Tenant({
          name: companyName,
          domain,
          tenantCode: companyName.substring(0, 4).toUpperCase() + Date.now(), // simple code generator
          contact: { adminName: adminName, email },
          subscription: { plan: "Free", status: "Active", startDate: new Date(), maxUsers: 50, features: [] },
          preferences: { timezone: "Asia/Kolkata", dateFormat: "DD-MM-YYYY", currency: "INR", language: "en" },
        });
        const savedTenant = await tenant.save();
    
        if(!savedTenant){
          throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, authMsg.error);
        }
        // 3. Hash password
        // 4. Create first admin user
        const user = new User({
          tenantId: tenant._id,
          name: adminName,
          email,
          password: password, // 3. auto connected to moongoose hook
          role: USER_CONSTANTS.ROLE,
          status: USER_CONSTANTS.STATUS,
        });
        const savedUser = await user.save();
        
        if(!savedUser){
          throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, authMsg.error);
        }
    
        return { savedTenant, savedUser };
    } catch (error) {
        if(error instanceof ApiErrorResponse){
            throw error;
        }
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, authMsg.error);
    }
}