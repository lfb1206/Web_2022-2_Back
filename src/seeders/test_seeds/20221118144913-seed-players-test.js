module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Players', [
    {
      color: 'Rojo',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 1,
      UserId: 1,
      MatchId: 1,
    },
    {
      color: 'Verde',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 2,
      UserId: 2,
      MatchId: 1,
    },
    {
      color: 'Azul',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 3,
      UserId: 3,
      MatchId: 1,
    },
    {
      color: 'Rojo',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 1,
      UserId: 1,
      MatchId: 2,
    },
    {
      color: 'Verde',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 2,
      UserId: 2,
      MatchId: 2,
    },
    {
      color: 'Azul',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 3,
      UserId: 3,
      MatchId: 2,
    },
    {
      color: 'Rojo',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 1,
      UserId: 2,
      MatchId: 3,
    },
    {
      color: 'Rojo',
      puntos_victoria: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      numero_jugador: 1,
      UserId: 1,
      MatchId: 4,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Players', null, {}),
};
