const request = require('supertest');
const { expect } = require('chai');


describe('Login User External', () => {
    describe('POST /registerUser', () => {

        it('Login User success', async () => {
            const response = await request('http://localhost:3000')
                .post('/api/users/login')
                .send({
                    email: 'felipemoralessuza@yahoo.com.br',
                    password: '123456'
                })
            console.log(response.body);
            const respostaEsperada = require('../fixture/respostas/registerUserSuccess.json');
            expect(response.status).to.equal(200);
            
        });

    });
})