module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Dwarves', [
    {
      nivel: 1,
      estado: false,
      posicion_x: 2,
      posicion_y: 0,
      MatchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      nivel: 1,
      estado: false,
      posicion_x: 3,
      posicion_y: 0,
      MatchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      nivel: 1,
      estado: false,
      posicion_x: 6,
      posicion_y: 3,
      MatchId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Dwarves', null, {}),
};
