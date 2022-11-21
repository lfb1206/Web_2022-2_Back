module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Matches', // table name
        'usuario_creador', // new field name
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Matches', 'usuario_creador'),
    ]);
  },
};
