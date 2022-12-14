const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Rental = sequelize.define(
  "rental",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    bike_id: { type: DataTypes.INTEGER, allowNull: false },
    client_id: { type: DataTypes.INTEGER, allowNull: false },
    rental_start_date: { type: DataTypes.DATE, allowNull: false },
    rental_end_date: { type: DataTypes.DATE },
    total_amount: { type: DataTypes.INTEGER, allowNull: false },
    payment_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    rental_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    remarks: { type: DataTypes.STRING, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Rental;
