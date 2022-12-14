const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const AdsManagment = sequelize.define(
  "adsmanagment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    ad_name: { type: DataTypes.STRING(30), allowNull: false },
    shop_id: { type: DataTypes.INTEGER, allowNull: false },
    banner_image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE },
    ad_location: { type: DataTypes.BOOLEAN, defaultValue: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = AdsManagment;
