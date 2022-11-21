module.exports = {
  // Match HasMany Hexagones
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Hexagones', // name of Target model
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

  // remove Match hasMany Hexagones
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Hexagones', // name of the Target model
    'MatchId', // key we want to remove
  ),

};
