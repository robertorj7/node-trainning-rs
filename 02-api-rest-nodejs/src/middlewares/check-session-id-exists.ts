import type { FastifyReply } from "fastify/types/reply.js"
import type { FastifyRequest } from "fastify/types/request.js"

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
    const sessionId = request.cookies.sessionId

    if (!sessionId) {
        return reply.status(401).send({
            error: 'Unauthorized' 
        })
    }
}