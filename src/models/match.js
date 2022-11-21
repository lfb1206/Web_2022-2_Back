const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Smuggling, { onDelete: 'CASCADE' });
      this.hasOne(models.Looter, { onDelete: 'CASCADE' });
      this.hasMany(models.Hexagone, { onDelete: 'CASCADE' });
      this.hasMany(models.Player, { onDelete: 'CASCADE' });
      this.hasMany(models.Building, { onDelete: 'CASCADE' });
    }
  }
  Match.init({
    cantidad_jugadores: DataTypes.INTEGER,
    tiempo_turno: DataTypes.FLOAT,
    puntos_victoria: DataTypes.INTEGER,
    iniciada: DataTypes.BOOLEAN,
    conectados: DataTypes.INTEGER,
    current_player: DataTypes.INTEGER,
    usuario_creador: DataTypes.INTEGER,
    jugador_ganador: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};
