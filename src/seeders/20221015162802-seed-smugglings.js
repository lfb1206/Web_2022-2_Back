module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Smugglings', [
    {
      posicion_x: null,
      posicion_y: null,
      hexagone: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 1,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Smugglings', null, {}),
};
