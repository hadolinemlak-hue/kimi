const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Customer = sequelize.define("Customer", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  note: {
    type: DataTypes.TEXT,
  },
});

module.exports = Customer;