const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Improvment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player);
    }
  }
  Improvment.init({
    tipo: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    beneficio: DataTypes.STRING,
    costo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Improvment',
  });
  return Improvment;
};
