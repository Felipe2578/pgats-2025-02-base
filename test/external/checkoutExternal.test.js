const request = require('supertest');
const { expect } = require('chai');

describe('Checkout External', () => {
    describe('POST /checkout', () => {

        it('should return 401 if token is invalid', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/checkout')
                .send({
                    items: [{ id: 1, quantity: 1 }],
                    freight: 10,
                    paymentMethod: 'credit_card',
                    cardData: { number: '1234', expiry: '12/24', cvv: '123' }
                })
            expect(response.status).to.equal(401);
            expect(response.body).to.deep.equal({ error: 'Token inválido' });

        });
    });
})