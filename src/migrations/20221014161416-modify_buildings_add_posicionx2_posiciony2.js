module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Buildings', // table name
        'posicion_x2', // new field name
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'Buildings', // table name
        'posicion_y2', // new field name
        {
          type: Sequelize.FLOAT,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Buildings', 'posicion_x2'),
      queryInterface.removeColumn('Buildings', 'posicion_y2'),
    ]);
  },
};
