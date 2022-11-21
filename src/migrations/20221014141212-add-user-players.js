module.exports = {
  // User HasMany Players
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'Players', // name of Target model
    'UserId', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users', // name of Source model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  ),

  // remove User hasMany Players
  down: (queryInterface, Sequelize) => queryInterface.removeColumn(
    'Players', // name of the Target model
    'UserId', // key we want to remove
  ),

};
