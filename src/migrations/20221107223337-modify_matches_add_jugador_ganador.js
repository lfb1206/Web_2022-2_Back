module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Matches', // table name
        'jugador_ganador', // new field name
        {
          type: Sequelize.STRING,
          allowNull: false,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Matches', 'jugador_ganador'),
    ]);
  },
};
