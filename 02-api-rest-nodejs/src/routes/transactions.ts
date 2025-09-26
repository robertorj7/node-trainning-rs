import type { FastifyInstance } from "fastify"
import { z } from "zod"
import { db } from "../database.ts"
import crypto from "node:crypto"

export async function transactionsRoutes(app: FastifyInstance) {
    app.get('/', async () => {
        const transactions = await db('transactions').select()
        return { transactions }
    })

    app.get('/:id', async (request) => {
        const getTransactionParamsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionParamsSchema.parse(request.params)

        const transaction = await db('transactions')
            .where('id', id)
            .first()

        return { transaction }
    })

    app.get('/summary', async () => {
        const summary = await db('transactions')
            .sum('amount', { as: 'amount' })
            .first()

        return { summary }
    })

    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = crypto.randomUUID()

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days
            })
        }

        await db('transactions')
            .insert({
                id: crypto.randomUUID(),
                title,
                amount: type === 'credit' ? amount : amount * -1,
                session_id: sessionId,                
        })

        return reply.status(201).send()
    })
}