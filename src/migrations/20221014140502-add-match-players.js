module.exports = {
  // Match HasMany Players
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Players', // name of Target model
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

  // remove Matchs hasMany Players
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Players', // name of the Target model
    'MatchId', // key we want to remove
  ),

};
