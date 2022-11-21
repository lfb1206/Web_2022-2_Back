const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Building, { onDelete: 'CASCADE' });
      this.hasMany(models.Dwarf, { onDelete: 'CASCADE' });
      this.hasMany(models.Material, { onDelete: 'CASCADE' });
      this.hasMany(models.Development, { onDelete: 'CASCADE' });
      this.hasMany(models.Improvment, { onDelete: 'CASCADE' });
      this.belongsTo(models.User);
      this.belongsTo(models.Match);
    }
  }
  Player.init({
    color: DataTypes.STRING,
    puntos_victoria: DataTypes.INTEGER,
    numero_jugador: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
