const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("test", "test", "test", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
})

module.exports = sequelize
