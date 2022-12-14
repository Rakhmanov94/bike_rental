const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Penalty = sequelize.define(
  "penalty",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    rental_id: { type: DataTypes.INTEGER, allowNull: false },
    penalty_amount: { type: DataTypes.INTEGER, allowNull: false },
    payment_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    remarks: { type: DataTypes.STRING, allowNull: false },
    paid_by: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Penalty;
