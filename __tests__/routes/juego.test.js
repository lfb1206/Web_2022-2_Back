const supertest = require('supertest');
const app = require('../../src/app');
const request = supertest(app.callback());

beforeAll(async () => {
    await app.context.orm.sequelize.authenticate();
});

afterAll(async () => {
    await app.context.orm.sequelize.close();
});

describe('Juego routes', () => {

    describe('GET /:matchId', () => {

        const getMatch = async (matchId, cookie) => request
            .get(`/juego/${matchId}`)
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

        describe('Get the data of the match correctly', () => {

            it('should return a 200 response', async () => {
                const response = await getMatch(1, cookie)
                expect(response.status).toEqual(200);
            });

            it('should return a match', async () => {
                const response = await getMatch(1, cookie)
                expect(JSON.parse(response.text)).toEqual({
                    jugadores: expect.any(Object),
                    tablero: {
                        tipo: expect.any(Array),
                        rieles: expect.any(Array),
                        contenido: expect.any(Object),
                    },
                    materiales: expect.any(Object),
                    saqueadores: expect.any(Object),
                    currentplayer: expect.any(Boolean),
                    ganador: expect.any(Object),
                    Iniciada: expect.any(Boolean), 
                });
            });
        });

        describe('Get the player information of the match with an invalid id', () => {
            it('should return a 404 response if the match does not exists', async () => {
                response = await getMatch(-1, cookie);
                expect(response.status).toBe(404);
            });
        });
    });
    
    describe('POST /:matchId/buy', () => {
        
        const postBuy = async (matchId, cookie, body) => request
            .post(`/juego/${matchId}/buy`)
            .set('Cookie', cookie)
            .send(body);
        
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

        describe('Valid Buy', () => {
            // Aqui construimos una mina nueva
            it('should return a 201 response', async () => {
                const body = {
                    x: 5,
                    y: 1,
                    x2: 5,
                    y2: 1,
                    accion: 'mina',
                };
                const response = await postBuy(1, cookie, body);
                expect(response.status).toBe(201);
            });
            
            it('should create a new building', async () => {
                const body = {
                    x: 7,
                    y: 1,
                    x2: 7,
                    y2: 1,
                    accion: 'mina',
                };
                const originalCount = await app.context.orm.Building.count();
                await postBuy(1, cookie, body);
                expect(await app.context.orm.Building.count()).toBe(originalCount + 1);
            });

            it('should create a new industrie', async () => {
                const body = {
                    x: 7,
                    y: 1,
                    x2: 7,
                    y2: 1,
                    accion: 'industria',
                };
                const response = await postBuy(1, cookie, body);
                expect(response.status).toBe(201);
            });

            it('should create a new road', async () => {
                const body = {
                    x: 7,
                    y: 1,
                    x2: 8,
                    y2: 1,
                    accion: 'riel',
                };
                const response = await postBuy(1, cookie, body);
                expect(response.status).toBe(201);
            });

            it('should return a 201 response', async () => {
                const body = {
                    x: 4,
                    y: 1,
                    x2: 4,
                    y2: 1,
                    accion: 'enano',
                };
                const response = await postBuy(1, cookie, body);
                expect(response.status).toBe(201);
            });
        });
        
        describe('Invalid Buy', () => {
            
            it('should return a 400 response, ubicacion no es valida', async () => {
                const body = {
                    x: 1,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    accion: 'mina',
                };
                const response = await postBuy(1, cookie, body);
                expect(response.status).toEqual(400);
            });
            it('should return a 403 response, not your turn', async () => {
                const body = {
                    x: 1,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    accion: 'mina',
                };
                const response = await postBuy(2, cookie, body);
                expect(response.status).toEqual(403);
            });
        });
    });

    describe('POST /:matchId/activate', () => {
        const postActivate = async (matchId, cookie, body) => request
            .post(`/juego/${matchId}/activate`)
            .set('Cookie', cookie)
            .send(body);

        const getMatch = async (matchId, cookie) => request
            .get(`/juego/${matchId}`)
            .set('Cookie', cookie);
        
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
        describe('Valid Activate Dwarf', () => {
            it('should return a 201 response', async () => {
                const body = {
                    x: 2,
                    y: 0,
                };
                const response = await postActivate(1, cookie, body);
                expect(response.status).toBe(201);
            });
            it('should increase de defense', async () =>{
                const body = {
                    x: 3,
                    y: 0,
                };
                const infoPartida = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida.text));
                const originalCount = JSON.parse(infoPartida.text).saqueadores.defensa
                await postActivate(1, cookie, body);
                const infoPartida2 = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida2.text));
                expect(JSON.parse(infoPartida2.text).saqueadores.defensa).toBe(originalCount + 1);
            });
        });

        describe('Invalid Activate Dwarf', () => {
            it('should return a 400 response, enano not found', async () => {
                const body = {
                    x: 11,
                    y: 0,
                };
                const response = await postActivate(1, cookie, body);
                expect(response.status).toBe(400);
            });

            it('should return a 403 response, not your turn', async () => {
                const body = {
                    x: 11,
                    y: 0,
                };
                const response = await postActivate(2, cookie, body);
                expect(response.status).toBe(403);
            });
        })
    });

    describe('GET /:matchId/upgrade', () => {
        const postActivate = async (matchId, cookie, body) => request
        .post(`/juego/${matchId}/upgrade`)
        .set('Cookie', cookie)
        .send(body);

        const getMatch = async (matchId, cookie) => request
            .get(`/juego/${matchId}`)
            .set('Cookie', cookie);
        
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
        describe('Valid Upgrade', () => {
            it('should return a 201 response', async () => {
                const body = {
                    x: 2,
                    y: 0,
                };
                const response = await postActivate(1, cookie, body);
                expect(response.status).toBe(201);
            });
            it('should increase the defense', async () =>{
                const body = {
                    x: 2,
                    y: 0,
                };
                const infoPartida = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida.text));
                const originalCount = JSON.parse(infoPartida.text).saqueadores.defensa
                await postActivate(1, cookie, body);
                const infoPartida2 = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida2.text));
                expect(JSON.parse(infoPartida2.text).saqueadores.defensa).toBe(originalCount + 1);
            });
        });

        describe('Invalid upgrade Dwarf', () => {
            it('should return a 400 response, enano not found', async () => {
                const body = {
                    x: 11,
                    y: 0,
                };
                const response = await postActivate(1, cookie, body);
                expect(response.status).toBe(400);
            });

            it('shouldn\'t increase the defense', async () =>{
                const body = {
                    x: 2,
                    y: 0,
                };
                const infoPartida = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida.text));
                const originalCount = JSON.parse(infoPartida.text).saqueadores.defensa
                await postActivate(1, cookie, body);
                const infoPartida2 = await getMatch(1, cookie)
                console.log(JSON.parse(infoPartida2.text));
                expect(JSON.parse(infoPartida2.text).saqueadores.defensa).toBe(originalCount);
            });

            it('should return a 403 response, not your turn', async () => {
                const body = {
                    x: 11,
                    y: 0,
                };
                const response = await postActivate(2, cookie, body);
                expect(response.status).toBe(403);
            });
        })
    });

    describe('POST /:matchId/move', () => {
        const postMove = async (matchId, cookie, body) => request
        .post(`/juego/${matchId}/move`)
        .set('Cookie', cookie)
        .send(body);
        
        let cookie;
        beforeAll(async () => {
            const loginResponse = await request
                .post('/auth/login')
                .send({
                    email: 'tomas@gmail.com',
                    password: '123456',
                });
            cookie = loginResponse.headers['set-cookie'];
        });

        describe('Change the dwarf position', () => {

            it('should return a 201 response', async () => {
                body = {
                    x: 6,
                    y: 3,
                    x2: 6,
                    y2: 2,
                };
                const response = await postMove(1, cookie, body);
                expect(response.status).toEqual(201);
            });
        });
        describe('Invalid position for the dwarf', () => {
            it('should return a 400 response', async () => {
                body = {
                    x: 6,
                    y: 3,
                    x2: 5,
                    y2: 3,
                };
                const response = await postMove(1, cookie, body)
                expect(response.status).toEqual(400)
            });
        });
    });

    describe('GET /:matchId/place', () => {

        const postPlace = async (matchId, cookie, body) => request
            .post(`/juego/${matchId}/place`)
            .set('Cookie', cookie)
            .send(body);
        
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

        describe('Valid Place', () => {
            // Aqui construimos una mina nueva
            it('1 should return a 201 response and create a new building', async () => {
                const body = {
                    x: 7,
                    y: 1,
                    x2: 7,
                    y2: 1,
                    accion: 'mina',
                };
                const originalCount = await app.context.orm.Building.count();
                const response = await postPlace(4, cookie, body);
                expect(await app.context.orm.Building.count()).toBe(originalCount + 1);
                expect(response.status).toBe(201);
            });
            
            it('2 should return a 201 response and create a new building', async () => {
                const body = {
                    x: 7,
                    y: 1,
                    x2: 8,
                    y2: 1,
                    accion: 'riel',
                };
                const originalCount = await app.context.orm.Building.count();
                const response = await postPlace(4, cookie, body);
                expect(await app.context.orm.Building.count()).toBe(originalCount + 1);
                expect(response.status).toBe(201);
            });

            it('3 should return a 201 response and create a new building', async () => {
                const body = {
                    x: 1,
                    y: 1,
                    x2: 1,
                    y2: 1,
                    accion: 'mina',
                };
                const originalCount = await app.context.orm.Building.count();
                const response = await postPlace(4, cookie, body);
                expect(await app.context.orm.Building.count()).toBe(originalCount + 1);
                expect(response.status).toBe(201);
            });

            it('4 should return a 201 response and create a new building', async () => {
                const body = {
                    x: 1,
                    y: 1,
                    x2: 2,
                    y2: 1,
                    accion: 'riel',
                };
                const originalCount = await app.context.orm.Building.count();
                const response = await postPlace(4, cookie, body);
                expect(await app.context.orm.Building.count()).toBe(originalCount + 1);
                expect(response.status).toBe(201);
            });
        });
        
        describe('Invalid Buy', () => {
            
            it('should return a 400 response, no se pueden ubicar mas buildings', async () => {
                const body = {
                    x: 1,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    accion: 'mina',
                };
                const response = await postPlace(4, cookie, body);
                expect(response.status).toEqual(400);
            });
        });
    });

    describe('GET /:matchId/play', () => {

        const sendPlay = async (matchId, cookie, body) => request
            .post(`/juego/${matchId}/play`)
            .set('Cookie', cookie)
            .send(body);
        
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

        describe('Play when at turn', () => {
            
            it('should return a 200 response and loose materials', async () => {
                const body = {
                    dados: 7,
                    evento: false
                }
                const originalCount = await app.context.orm.Material.count();
                const response = await sendPlay(1, cookie, body)
                expect(await app.context.orm.Material.count()).toBe(Math.floor(originalCount / 2) + 1);
                expect(response.status).toEqual(200);
            });

            it('should return a 200 response', async () => {
                const body = {
                    dados: 12,
                    evento: false
                }
                const response = await sendPlay(1, cookie, body);
                expect(response.status).toEqual(200);
            });

            it('should return a 200 response and not gain material', async () => {
                const body = {
                    dados: 10,
                    evento: false
                }
                const response = await sendPlay(1, cookie, body)
                expect(response.status).toEqual(200);
            });
        });

        describe('Play when not at turn', () => {
            it('should return a 403 response', async () => {
                const body = {
                    dados: 9,
                    evento: false
                }
                response = await sendPlay(2, cookie, body);
                expect(response.status).toBe(403);
            });
        });
    });


    describe('GET /:matchId/endTurn', () => {

        const endTurn = async (matchId, cookie) => request
            .get(`/juego/${matchId}/endTurn`)
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

        describe('End turn when at turn', () => {

            it('should return a 200 response', async () => {
                const response = await endTurn(1, cookie)
                expect(response.status).toEqual(200);
            });
        });

        describe('End turn when not at turn', () => {
            it('should return a 403 response', async () => {
                response = await endTurn(2, cookie);
                expect(response.status).toBe(403);
            });
        });
    });
});