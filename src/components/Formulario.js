import React, { Component } from "react";
import Mensaje from "./Mensaje";
import ListaEmpleados from "./ListaEmpleados";

class Formulario extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      last_name: "",
      email: "",
      phone: "",
      creado: false,
      empleados: []
    };
  }
  updateEmpleado = empleado => {
    this.setState({
      id: empleado[0].id,
      name: empleado[0].name,
      last_name: empleado[0].last_name,
      email: empleado[0].email,
      phone: empleado[0].phone
    });
  };
  updateState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    this.fetchEmpleados();
  }
  fetchEmpleados = () => {
    fetch("/empleados")
      .then(data => data.json())
      .then(empleados => {
        this.setState({
          empleados
        });
      })
      .catch(err => console.log(err));
  };

  checkState = () => {
    const { name, last_name, email, phone } = this.state;
    const noValido = !name || !last_name || !email || !phone;
    return noValido;
  };
  agregarEmpleado = e => {
    e.preventDefault();
    if (this.state.id == "") {
      fetch("/agregar_empleado", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(empleado => empleado.json())
        .then(empleado => {
          this.setState(
            {
              creado: true
            },
            () => {
              setTimeout(() => {
                this.setState({
                  name: "",
                  last_name: "",
                  email: "",
                  phone: "",
                  creado: false
                });
              }, 2000);
            }
          );
          this.fetchEmpleados();
          console.log(empleado);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch(`/actualizar_empleado/${this.state.id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(empleado => empleado.json())
        .then(empleado => {
          this.setState(
            {
              creado: true
            },
            () => {
              setTimeout(() => {
                this.setState({
                  id: "",
                  name: "",
                  last_name: "",
                  email: "",
                  phone: "",
                  creado: false
                });
              }, 2000);
            }
          );
          this.fetchEmpleados();
          console.log(empleado);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="text-center">
              {this.state.id == "" ? (
                <div className="card-header">Agregar empleado</div>
              ) : (
                <div className="card-header">Actualizar empleado</div>
              )}
              <div className="card-body" />
              <h5 className="card-title">Datos del empleado</h5>
              <form onSubmit={this.agregarEmpleado}>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Nombre del empleado"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Apellido del empleado"
                    className="form-control"
                    name="last_name"
                    value={this.state.last_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Email del empleado"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Numero del empleado"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                  />
                </div>
                {this.state.id != "" ? (
                  <input
                    disabled={this.checkState()}
                    className="btn btn-outline-primary btn-block"
                    type="submit"
                    value="Actualizar"
                  />
                ) : (
                  <input
                    disabled={this.checkState()}
                    className="btn btn-outline-primary btn-block"
                    type="submit"
                    value="Guardar"
                  />
                )}
              </form>
            </div>
            <br />
            {this.state.creado && (
              <Mensaje mensaje="Empleado agregado correctamente" />
            )}
          </div>
          <div className="col-md-8">
            <ListaEmpleados
              fetchEmpleados={this.fetchEmpleados}
              empleados={this.state.empleados}
              updateEmpleado={this.updateEmpleado}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Formulario;
