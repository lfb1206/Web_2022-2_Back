const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Development extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player);
    }
  }
  Development.init({
    accion: DataTypes.STRING,
    costo: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Development',
  });
  return Development;
};
