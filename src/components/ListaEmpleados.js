import React, { Component } from "react";
import Mensaje from "./Mensaje";
import Formulario from "./Formulario";

class ListaEmpleados extends Component {
  state = { borrado: false };
  borrarEmpleado = e => {
    const { fetchEmpleados } = this.props;

    e.preventDefault();
    fetch(`borrar_empleado/${e.target.value}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(res => {
        fetchEmpleados();
        this.setState(
          {
            borrado: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                borrado: false
              });
            }, 2000);
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  actualizarEmpleado = e => {
    const { updateEmpleado } = this.props;
    fetch(`empleado/${e.target.value}`)
      .then(data => data.json())
      .then(empleado => {
        updateEmpleado(empleado);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="table-responsive-sm">
        <h2>Lista de empleados</h2>
        <table className="table table-responsive-md table-hover table-sm empleados">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.empleados.map(empleado => {
              return (
                <tr key={empleado.id}>
                  <td>{empleado.name}</td>
                  <td>{empleado.last_name}</td>
                  <td>{empleado.email}</td>
                  <td>{empleado.phone}</td>
                  <td>
                    <button
                      value={empleado.id}
                      className="btn btn-outline-secondary btn-block btn-sm"
                      onClick={this.actualizarEmpleado}
                    >
                      Actualizar
                    </button>
                    <br />
                    <button
                      value={empleado.id}
                      className="btn btn-outline-danger btn-block btn-sm"
                      onClick={this.borrarEmpleado}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.borrado && (
          <Mensaje mensaje="Empleado borrado correctamente" />
        )}
      </div>
    );
  }
}

export default ListaEmpleados;
