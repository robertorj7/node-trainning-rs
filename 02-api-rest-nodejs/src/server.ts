import fastify from 'fastify';
import crypto from 'node:crypto';
import { db } from './database.js';

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

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running on http://localhost:3333')
})