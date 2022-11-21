module.exports = {
  // Match HasOne Looter
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Looters', // name of Target model
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

  // remove Match hasOne Looters
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Looters', // name of the Target model
    'MatchId', // key we want to remove
  ),

};
