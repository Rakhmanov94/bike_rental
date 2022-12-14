const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const ShopInfo = sequelize.define(
  "shopinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    shop_name: { type: DataTypes.STRING, unique: true, allowNull: false },
    owner_name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    email_address: { type: DataTypes.STRING, allowNull: false },
    contact_no: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING, allowNull: false },
    updated_by: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ShopInfo;
