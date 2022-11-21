const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
    await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
    await app.context.orm.sequelize.close();
});

describe('Auth routes', () => {
    describe('POST auth/signup', () => {

        const postSignup = async (body) => request
            .post('/auth/signup')
            .send(body);

        describe('Valid signup', () => {

            it('should return a 201 response', async () => {
                const body = {
                    email: 'lucasbunout@gmail.com',
                    password: '12345678!',
                    username: 'lfb1206',
                };
                const response = await postSignup(body)
                expect(response.status).toBe(201);
            });

            it('should create a user', async () => {
                const body = {
                    email: 'lucasfernandez@gmail.com',
                    password: '12345678!',
                    username: 'lfb12',
                };
                const originalCount = await app.context.orm.User.count();
                await postSignup(body);
                expect(await app.context.orm.User.count()).toBe(originalCount + 1);
            });
        });

        describe('Invalid signup', () => {
            it('should return a 400 response', async () => {
                const body = {
                    email: 'lucas@gmail.com',
                    password: '12345678!',
                    username: 'Lucas',
                };
                const response = await postSignup(body)
                expect(response.status).toBe(400);
            });

            it('should not create a user', async () => {
                const body = {
                    email: 'lucas@gmail.com',
                    username: 'Lucas',
                };
                const originalCount = await app.context.orm.User.count();
                await postSignup(body);
                expect(await app.context.orm.User.count()).toBe(originalCount);
            });
        })
    });

    describe('POST auth/login', () => {

        const postSignup = async (body) => request
            .post('/auth/login')
            .send(body);

        describe('Valid login', () => {

            const body = {
                email: 'lucas@gmail.com',
                password: 'abc123',
            };

            it('should return a 200 response', async () => {
                const response = await postSignup(body)
                expect(response.status).toBe(200);
            });
        });

        describe('Invalid login', () => {
            it('should return a 404 response', async () => {
                const body = {
                    email: 'lucas@gmail.com',
                    password: '12345678!',
                };
                const response = await postSignup(body)
                expect(response.status).toBe(404);
            });

            it('should not login', async () => {
                const body = {
                    email: 'l@gmail.com',
                    password: '12345678!',
                };
                const response = await postSignup(body)
                expect(response.status).toBe(404);
            });
        })
    });

    describe('POST auth/logout', () => {

        const postLogout = async (cookie) => request
            .post('/auth/logout')
            .set('Cookie', cookie);

        let response;
        let cookie;
        beforeAll(async () => {
            const loginResponse = await request
                .post('/auth/login')
                .send({
                    email: 'lucas@gmail.com',
                    password: 'abc123',
                });
            cookie = loginResponse.headers['set-cookie'];
        });

        describe('Valid logout', () => {
            it('should return a 200 response', async () => {
                const response = await postLogout(cookie)
                expect(response.status).toBe(200);
            });
        });
    })
})