module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Developments', [
    {
      accion: null,
      costo: '1',
      puntos: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
    },
    {
      accion: null,
      costo: '1',
      puntos: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      accion: null,
      costo: '1',
      puntos: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 3,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Developments', null, {}),
};
