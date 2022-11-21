const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Player, { onDelete: 'CASCADE' });
      this.hasMany(models.Session, {
        foreignKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    hash_contrasena: DataTypes.STRING,
    email: DataTypes.STRING,
    nivel: DataTypes.INTEGER,
    avatar: DataTypes.STRING,
    victorias: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
