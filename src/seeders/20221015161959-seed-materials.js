module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Materials', [
    {
      materia_prima: 'coal',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'gold',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'coal',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'coal',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
    },
    {
      materia_prima: 'coal',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 2,
    },
    {
      materia_prima: 'iron',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'coal',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'rock',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'wood',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
    {
      materia_prima: 'rock',
      createdAt: new Date(),
      updatedAt: new Date(),
      PlayerId: 1,
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Materials', null, {}),
};
