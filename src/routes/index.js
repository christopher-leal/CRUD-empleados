const express = require("express");
const router = express.Router();
const {
  listarEmpleados,
  agregarEmpleado,
  modificarEmpleado,
  borrarEmpleado,
  buscarEmpleado,
  buscador
} = require("./empleados");

router.get("/empleados", listarEmpleados);
router.get("/empleado/:id", buscarEmpleado);
router.post("/buscador/", buscador);
router.post("/agregar_empleado", agregarEmpleado);
router.put("/actualizar_empleado/:id", modificarEmpleado);
router.delete("/borrar_empleado/:id", borrarEmpleado);

module.exports = router;
