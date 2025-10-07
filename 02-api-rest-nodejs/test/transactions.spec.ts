import { test, beforeAll, afterAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.ts'
import { id } from 'zod/locales'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
      await app.close()
  })

  it('should allow user to create a new transaction', async () => {
      const response = await request(app.server)
        .post('/transactions')
        .set('Cookie', 'sessionId=123456')
        .send({
          title: 'New transaction',
          amount: 5000,
          type: 'credit'
        });
  
        console.log(response.headers)
        expect(response.status).toBe(201);
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .set('Cookie', 'sessionId=123456')
      .send({
        title: 'New transaction',
        amount: 5000,
        type: 'credit'
      });

      const cookies = createTransactionResponse.get('Set-Cookie')

      const listTransactionsResponse = await request(app.server)
        .get('/transactions')
        .set('Cookie', cookies ? cookies.join('; ') : '')
        .expect(200)

      expect(listTransactionsResponse.body.transactions).toEqual([
          expect.objectContaining({
            title: 'New transaction',
            amount: 5000,
            type: 'credit'
          })
      ])
  })
})