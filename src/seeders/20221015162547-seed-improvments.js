module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Improvments', [
    {
      tipo: null,
      nivel: 1,
      beneficio: null,
      costo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      tipo: null,
      nivel: 1,
      beneficio: null,
      costo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
    },
    {
      tipo: null,
      nivel: 1,
      beneficio: null,
      costo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 3,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Improvments', null, {}),
};
