module.exports = {
  // Match HasMany Buildings
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Buildings', // name of Target model
    'MatchId', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Matches', // name of Source model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ),

  // remove Matchs hasMany Buildings
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Buildings', // name of the Target model
    'MatchId', // key we want to remove
  ),

};
