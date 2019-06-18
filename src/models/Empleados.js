const Sequelize = require("sequelize");
const db = require("../config/database");

//definicion del modelo empleado para tener comunicacion con la bd
const Empleado = db.define("empleado", {
  name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  }
});

module.exports = Empleado;
