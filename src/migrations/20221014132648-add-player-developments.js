module.exports = {
  // Player HasMany Developments
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Developments', // name of Target model
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

  // remove Player hasMany Developments
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Developments', // name of the Target model
    'PlayerId', // key we want to remove
  ),

};
