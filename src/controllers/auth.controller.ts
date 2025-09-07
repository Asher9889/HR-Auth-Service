import { FastifyRequest, FastifyReply } from "fastify";


function signup (req:FastifyRequest, res:FastifyReply){
    const body = console.log(req.body);
}

export { signup }