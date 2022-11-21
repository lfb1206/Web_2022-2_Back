const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dwarf extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player);
    }
  }
  Dwarf.init({
    nivel: DataTypes.INTEGER,
    estado: DataTypes.BOOLEAN,
    posicion_x: DataTypes.INTEGER,
    posicion_y: DataTypes.INTEGER,
    MatchId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Dwarf',
  });
  return Dwarf;
};
