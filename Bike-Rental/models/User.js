const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    username: { type: DataTypes.STRING(30), allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
    fullname: { type: DataTypes.STRING(50), allowNull: false },
    contact: { type: DataTypes.STRING(15), allowNull: false },
    email: { type: DataTypes.STRING(30), allowNull: false },
    user_category_id: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
