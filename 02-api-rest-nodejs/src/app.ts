import fastify from 'fastify';
import cookie from '@fastify/cookie';

import { env } from './env/index.ts';
import { transactionsRoutes } from './routes/transactions.ts';

export const app = fastify()

app.register(cookie)

app.register(transactionsRoutes, { 
  prefix: 'transactions' 
})