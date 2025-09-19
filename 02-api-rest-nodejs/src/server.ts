import fastify from 'fastify';
import crypto from 'node:crypto';
import { db } from './database.js';
import { env } from './env/index.ts';

const app = fastify()

app.get('/', async () => {
  const transaction = await db('transactions').insert({
    id: crypto.randomUUID(),
    title: 'New transaction',
    amount: 1000,    
  })
  .returning('*')

  return transaction
})

app.listen({ 
  port: env.PORT 
})
  .then(() => {
  console.log(`HTTP Server running on http://localhost:${env.PORT}`)
})