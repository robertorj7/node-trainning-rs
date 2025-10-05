import { test, beforeAll, afterAll, expect, describe, it } from 'vitest'
import request from 'supertest'
import { app } from '../src/app.ts'

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
  
        console.log(response.body)
        expect(response.status).toBe(201);
  })
})