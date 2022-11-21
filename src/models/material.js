const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Material extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player);
    }
  }
  Material.init({
    materia_prima: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Material',
  });
  return Material;
};
