const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Token = sequelize.define(
  "token",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    user_id: { type: DataTypes.STRING, allowNull: false },
    user_os: { type: DataTypes.STRING, allowNull: false },
    user_device: { type: DataTypes.STRING, allowNull: false },
    token: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Token;
