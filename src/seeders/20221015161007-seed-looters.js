module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Looters', [
    {
      avance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 1,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Looters', null, {}),
};
