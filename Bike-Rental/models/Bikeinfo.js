const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const BikeInfo = sequelize.define(
  "bikeinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull:false 
    },
    bike_category_id: { type: DataTypes.INTEGER, allowNull: false },
    shop_id: { type: DataTypes.INTEGER, allowNull: false },
    bike_name: { type: DataTypes.STRING(30), allowNull: false },
    specs: { type: DataTypes.STRING(100), allowNull: false },
    rent_price: { type: DataTypes.INTEGER, allowNull: false },
    availability: { type: DataTypes.BOOLEAN, defaultValue:false, },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = BikeInfo;
