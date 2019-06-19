import React from "react";

const Mensaje = ({ mensaje }) => {
  return (
    <div className="alert alert-success" role="alert">
      {mensaje}
    </div>
  );
};

export default Mensaje;
