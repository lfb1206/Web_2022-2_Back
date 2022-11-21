module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'Matches', // table name
        'iniciada', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('Matches', 'iniciada'),
    ]);
  },
};
