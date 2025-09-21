const request = require('supertest');
const { expect } = require('chai');

describe('Checkout External', () => {
    describe('POST /checkout', () => {

        it.only('Login success and perform checkout', async () => {
            // perform login to obtain token
            const responseLogin = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email: 'felipemoralessouza@email.com.br',
                    password: '123456'
                });
            const token = responseLogin.body.token;


            // perform checkout using obtained token
            const response = await request('http://localhost:3000')
                .post('/api/checkout')
                .set('authorization', `Bearer ${token}`)
                .send({
                    items: [{ productId: 1, quantity: 2 }],
                    freight: 3,
                    paymentMethod: 'credit_card',
                    cardData: { number: '1234', expiry: '12/24', cvv: '123' }
                });


            const respostaEsperada = require('../fixture/respostas/chekoutSucess.json');

            // basic assertions (adjust per expected behavior)
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('valorFinal');
            expect(response.body).to.deep.equal(respostaEsperada)
        });

        it('should return 401 if token is invalid', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/checkout')
                .send({
                    items: [{ id: 1, quantity: 1 }],
                    freight: 10,
                    paymentMethod: 'credit_card',
                    cardData: { number: '1234', expiry: '12/24', cvv: '123' }
                });

            expect(response.status).to.equal(401);
            expect(response.body).to.deep.equal({ error: 'Token inválido' });
        });

    });
});
