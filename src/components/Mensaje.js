import React from "react";

const Mensaje = ({ mensaje, clase }) => {
  let componente;
  if (mensaje != "") {
    componente = (
      <div className={`alert alert-${clase} text-center`} role="alert">
        {mensaje}
      </div>
    );
  } else {
    componente = null;
  }
  return componente;
};

export default Mensaje;
