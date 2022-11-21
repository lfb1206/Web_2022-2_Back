module.exports = {
  // Player HasMany Buildings
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Buildings', // name of Target model
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

  // remove Player hasMany Buildings
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Buildings', // name of the Target model
    'PlayerId', // key we want to remove
  ),

};
