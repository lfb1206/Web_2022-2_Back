module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Buildings', [
    {
      tipo: 'mina',
      costo: '1',
      puntos: 1,
      posicion_x: 3,
      posicion_y: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 3,
      posicion_x2: 3,
      posicion_y2: 3,
      MatchId: 1,
    },
    {
      tipo: 'industria',
      costo: '1',
      puntos: 1,
      posicion_x: 3,
      posicion_y: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
      posicion_x2: 3,
      posicion_y2: 1,
      MatchId: 1,
    },
    {
      tipo: 'mina',
      costo: '1',
      puntos: 1,
      posicion_x: 5,
      posicion_y: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
      posicion_x2: 5,
      posicion_y2: 3,
      MatchId: 1,
    },
    {
      tipo: 'riel',
      costo: '1',
      puntos: 1,
      posicion_x: 0,
      posicion_y: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
      posicion_x2: 1,
      posicion_y2: 0,
      MatchId: 1,
    },
    {
      tipo: 'riel',
      costo: '1',
      puntos: 1,
      posicion_x: 0,
      posicion_y: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 3,
      posicion_x2: 1,
      posicion_y2: 1,
      MatchId: 1,
    },
    {
      tipo: 'riel',
      costo: '1',
      puntos: 1,
      posicion_x: 2,
      posicion_y: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
      posicion_x2: 3,
      posicion_y2: 1,
      MatchId: 1,
    },
    {
      tipo: 'industria',
      costo: '1',
      puntos: 2,
      posicion_x: 4,
      posicion_y: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 3,
      posicion_x2: 4,
      posicion_y2: 4,
      MatchId: 1,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Buildings', null, {}),
};
