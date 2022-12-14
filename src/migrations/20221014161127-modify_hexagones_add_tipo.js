module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Hexagones', // table name
        'tipo', // new field name
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
      queryInterface.removeColumn('Hexagones', 'tipo'),
    ]);
  },
};
