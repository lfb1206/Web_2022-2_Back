module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Matches', // table name
        'puntos_victoria', // new field name
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
      queryInterface.removeColumn('Matches', 'puntos_victoria'),
    ]);
  },
};
