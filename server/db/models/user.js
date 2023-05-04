const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Room, Game}) {
      this.hasMany(Room, { foreignKey: 'userid' })
      this.hasMany(Game, { foreignKey: 'userid' })
      
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
  
      hashpass: DataTypes.STRING,
   
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
