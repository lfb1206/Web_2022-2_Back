const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
    await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
    await app.context.orm.sequelize.close();
});

describe('Protected routes', () => {
    describe('Delete /matches/:id_match', () => {

        const deleteMatch = async (matchId, cookie, token) => request
            .delete(`/protected/matches/${matchId}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Cookie', cookie);
        
        let response;
        let cookie;
        let token;
        beforeAll(async () => {
            const loginResponse = await request
                .post('/auth/login')
                .send({
                    email: 'lucas@gmail.com',
                    password: 'abc123',
                });
            cookie = loginResponse.headers['set-cookie'];
            token = loginResponse.body.token;
        });

        describe('Delete the match correctly', () => {
            it('should return a 204 response', async () => {
                const originalCount = await app.context.orm.Match.count()
                response = await deleteMatch(1, cookie, token);
                expect(response.status).toBe(204);
                expect(await app.context.orm.Match.count()).toBe(originalCount - 1);
            });
        });

        describe('Invalid signup', () => {
            it('should return a 401 response', async () => {
                response = await deleteMatch(-1, cookie, token);
                expect(response.status).toBe(401);
            });
        })
    })
})