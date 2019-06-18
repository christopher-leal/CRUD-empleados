const Empleado = require("../models/Empleados");

const listarEmpleados = async (req, res) => {
  const empleados = await Empleado.findAll();
  res.json(empleados);
};

const agregarEmpleado = async (req, res) => {
  const { name, last_name, email, phone } = req.body;
  const empleado = await Empleado.create({
    name,
    last_name,
    email,
    phone
  });
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
  console.log(filaAfectada);
};
const borrarEmpleado = async (req, res) => {
  const { id } = req.params;
  const empleadoEliminado = await Empleado.destroy({
    where: { id }
  });
  console.log(empleadoEliminado);
};

module.exports = {
  listarEmpleados,
  agregarEmpleado,
  modificarEmpleado,
  borrarEmpleado
};
