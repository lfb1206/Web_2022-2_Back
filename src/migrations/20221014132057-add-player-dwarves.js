module.exports = {
  // Player HasMany Dwarves
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Dwarves', // name of Target model
    'PlayerId', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Players', // name of Source model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ),

  // remove Player hasMany Dwarves
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Dwarves', // name of the Target model
    'PlayerId', // key we want to remove
  ),

};
