module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'Lucas',
      hash_contrasena: '$2a$05$.cYKZWUBBbWmzufyOOyb4OjXkVopQq4AA8hpB2e6/fvv61E8L6aPK',
      email: 'lucas@gmail.com',
      nivel: 1,
      avatar: 'Avatar2',
      victorias: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Tomas',
      hash_contrasena: '$2a$05$dkYHAOZHwGbRA.VWdp1q9.sbi8qxs0Ovylpdaf7vXzkwN.B4VWY2e',
      email: 'tomas@gmail.com',
      nivel: 1,
      avatar: 'Avatar1',
      victorias: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Anto',
      hash_contrasena: '$2a$05$63yRXQXjM776/NLLwNGfrecz64NFODOdS6f8VxnAa9tyblPdCCfTy',
      email: 'anto@gmail.com',
      nivel: 1,
      avatar: 'Avatar3',
      victorias: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
