module.exports = {
  // Match HasOne Smugglings
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Smugglings', // name of Target model
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

  // remove Match hasOne Smugglings
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Smugglings', // name of the Target model
    'MatchId', // key we want to remove
  ),

};
