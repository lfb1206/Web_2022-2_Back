module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Looters', [
    {
      avance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 1,
    },
    {
      avance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 2,
    },
    {
      avance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 3,
    },
    {
      avance: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      MatchId: 4,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Looters', null, {}),
};
