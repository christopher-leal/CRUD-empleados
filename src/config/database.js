const Sequelize = require("sequelize");

module.exports = new Sequelize("lista_empleados", "root", "", {
  host: "127.0.0.1",
  port: "3306",
  dialect: "mysql",
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000
  }
});
