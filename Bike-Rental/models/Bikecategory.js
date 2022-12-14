const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const BikeCategory = sequelize.define(
  "bikecategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false,
    },
    category_name: { type: DataTypes.STRING(30), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

module.exports = BikeCategory;
