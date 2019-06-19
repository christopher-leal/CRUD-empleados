const Empleado = require("../models/Empleados");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const listarEmpleados = async (req, res) => {
  const empleados = await Empleado.findAll();
  res.json(empleados);
};
const buscarEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleado = await Empleado.findAll({
    where: { id }
  });
  res.json(empleado);
};
const buscador = async (req, res) => {
  const { type, search, place } = req.body;
  let empleados;
  switch (place) {
    case "start":
      empleados = await Empleado.findAll({
        where: {
          [type]: { [Op.startsWith]: search }
        }
      });
      res.json(empleados);
      break;
    case "sub":
      empleados = await Empleado.findAll({
        where: {
          [type]: { [Op.substring]: search }
        }
      });
      res.json(empleados);
      break;
    case "end":
      empleados = await Empleado.findAll({
        where: {
          [type]: { [Op.endsWith]: search }
        }
      });
      res.json(empleados);

      break;

    default:
      break;
  }
};
const agregarEmpleado = async (req, res) => {
  const { name, last_name, email, phone } = req.body;
  const empleado = await Empleado.create({
    name,
    last_name,
    email,
    phone
  });
  res.json({ empleado });
};
const modificarEmpleado = async (req, res) => {
  const { id } = req.params;
  const { name, last_name, email, phone } = req.body;
  const [numFilasAfectadas, filaAfectada] = await Empleado.update(
    {
      name,
      last_name,
      email,
      phone
    },
    {
      where: { id },
      returning: true,
      plain: true
    }
  );
  res.json("Empleado actualizado");
};
const borrarEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleadoEliminado = await Empleado.destroy({
    where: { id }
  });
  res.json("Empleado borrado");
};

module.exports = {
  listarEmpleados,
  agregarEmpleado,
  modificarEmpleado,
  borrarEmpleado,
  buscarEmpleado,
  buscador
};
