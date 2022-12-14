const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const OTP = sequelize.define(
  "otp",
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    otp: { type: DataTypes.STRING, allowNull: false },
    expiration_time: { type: DataTypes.DATE, allowNull: false },
    verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = OTP;
