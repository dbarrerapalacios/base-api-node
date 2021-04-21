const Sequelize = require("sequelize");
const sequelize = require("./../libConfig/sequelize");

module.exports = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);
