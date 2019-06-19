const Empleado = require("../models/Empleados");

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
const agregarEmpleado = async (req, res) => {
  const { name, last_name, email, phone } = req.body;
  const empleado = await Empleado.create({
    name,
    last_name,
    email,
    phone
  });
  res.json(empleado);
  console.log(empleado);
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
  console.log(filaAfectada);
};
const borrarEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleadoEliminado = await Empleado.destroy({
    where: { id }
  });
  res.json("Empleado borrado");
  console.log(empleadoEliminado);
};

module.exports = {
  listarEmpleados,
  agregarEmpleado,
  modificarEmpleado,
  borrarEmpleado,
  buscarEmpleado
};
