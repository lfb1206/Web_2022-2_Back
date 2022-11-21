module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      username: 'Administrador',
      hash_contrasena: '$2a$12$pt3cY/M5YH.SPKVXhytWsOLBh/bjYedk9fAYs4xRzssI3KIeCDP4W',
      email: 'administrador@gmail.com',
      nivel: 1,
      avatar: 'AvatarAdministrador',
      victorias: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
