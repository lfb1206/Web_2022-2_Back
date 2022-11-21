const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Smuggling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match);
    }
  }
  Smuggling.init({
    posicion_x: DataTypes.FLOAT,
    posicion_y: DataTypes.FLOAT,
    hexagone: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Smuggling',
  });
  return Smuggling;
};
