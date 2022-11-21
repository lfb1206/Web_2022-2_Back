module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Matches', [
    {
      cantidad_jugadores: 3,
      tiempo_turno: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      puntos_victoria: 13,
      current_player: 1,
      iniciada: true,
      conectados: 3,
      usuario_creador: 1,
      jugador_ganador: 'false',
    },
    {
      cantidad_jugadores: 3,
      tiempo_turno: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      puntos_victoria: 13,
      current_player: 2,
      iniciada: true,
      conectados: 3,
      usuario_creador: 1,
      jugador_ganador: 'false',
    },
    {
      cantidad_jugadores: 4,
      tiempo_turno: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      puntos_victoria: 13,
      current_player: 1,
      iniciada: true,
      conectados: 1,
      usuario_creador: 2,
      jugador_ganador: 'false',
    },
    {
      cantidad_jugadores: 3,
      tiempo_turno: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
      puntos_victoria: 13,
      current_player: 1,
      iniciada: false,
      conectados: 1,
      usuario_creador: 1,
      jugador_ganador: 'false',
    },
  ]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Matches', null, {}),
};