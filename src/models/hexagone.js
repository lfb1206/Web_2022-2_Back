const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Hexagone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match);
    }
  }
  Hexagone.init({
    numero: DataTypes.INTEGER,
    posicion_x: DataTypes.FLOAT,
    posicion_y: DataTypes.FLOAT,
    smuggling: DataTypes.BOOLEAN,
    tipo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Hexagone',
  });
  return Hexagone;
};
