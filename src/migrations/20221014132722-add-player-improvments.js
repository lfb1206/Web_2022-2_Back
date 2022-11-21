module.exports = {
  // Player HasMany Improvments
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Improvments', // name of Target model
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

  // remove Player hasMany Improvments
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Improvments', // name of the Target model
    'PlayerId', // key we want to remove
  ),

};
