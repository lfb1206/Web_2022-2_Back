const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player);
      this.belongsTo(models.Match);
    }
  }
  Building.init({
    tipo: DataTypes.STRING,
    costo: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    posicion_x: DataTypes.FLOAT,
    posicion_y: DataTypes.FLOAT,
    posicion_x2: DataTypes.FLOAT,
    posicion_y2: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Building',
  });
  return Building;
};
