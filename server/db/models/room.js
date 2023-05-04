'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Game }) {
      this.belongsTo(User, { foreignKey: 'userid' })
      this.hasMany(Game, { foreignKey: 'roomid' })
    }
  }
  Room.init({
    pin: DataTypes.STRING,
    userid: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};