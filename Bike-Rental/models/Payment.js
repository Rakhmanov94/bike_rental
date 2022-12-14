const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    rental_id: { type: DataTypes.INTEGER, allowNull: false },
    payment_type: { type: DataTypes.INTEGER, allowNull: false },
    paid_by: { type: DataTypes.STRING, allowNull: false },
    payment_date: { type: DataTypes.DATE, allowNull: false },
    remarks: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Payment;
