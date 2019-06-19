const express = require("express");
const router = express.Router();
const {
  listarEmpleados,
  agregarEmpleado,
  modificarEmpleado,
  borrarEmpleado,
  buscarEmpleado
} = require("./empleados");

router.get("/empleados", listarEmpleados);
router.get("/empleado/:id", buscarEmpleado);
router.post("/agregar_empleado", agregarEmpleado);
router.put("/actualizar_empleado/:id", modificarEmpleado);
router.delete("/borrar_empleado/:id", borrarEmpleado);

module.exports = router;
