const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Client = sequelize.define(
  "client",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    client_code: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: false },
    client_name: { type: DataTypes.STRING, allowNull: false },
    email_address: { type: DataTypes.STRING, allowNull: false },
    contact_number: { type: DataTypes.STRING, allowNull: false },
    complete_address: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Client;
