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
  resultadoBuscador = empleados => {
    if (empleados) {
      this.setState({
        empleados
      });
      console.log(empleados);
    } else {
      // this.fetchEmpleados();
      console.log("no hay nada");
    }
  };
  checkState = () => {
    const { name, last_name, email, phone } = this.state;
    const noValido = !name || !last_name || !email || !phone;
    return noValido;
  };
  agregarEmpleado = e => {
    e.preventDefault();
    if (this.state.id === "") {
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
  cancelUpdate = () => {
    this.setState({
      id: "",
      name: "",
      last_name: "",
      email: "",
      phone: "",
      creado: false
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              {this.state.id === "" ? (
                <div className="card-header">Add employee</div>
              ) : (
                <div className="card-header">Update employee</div>
              )}
              <div className="card-body" />
              <h5 className="card-title">Information</h5>
              <form onSubmit={this.agregarEmpleado}>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Name of the employee"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Lastname of the employee"
                    className="form-control"
                    name="last_name"
                    value={this.state.last_name}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Email of the employee"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    onChange={this.updateState}
                    type="text"
                    placeholder="Phone of the employee"
                    className="form-control"
                    name="phone"
                    value={this.state.phone}
                  />
                </div>
                {this.state.id !== "" ? (
                  <div className="row mx-md-n1">
                    <input
                      disabled={this.checkState()}
                      className="btn btn-outline-primary col px-md-3"
                      type="submit"
                      value="Update"
                    />
                    <input
                      onClick={this.cancelUpdate}
                      className="btn btn-outline-warning col px-md-3"
                      type="submit"
                      value="Cancel"
                    />
                  </div>
                ) : (
                  <input
                    disabled={this.checkState()}
                    className="btn btn-outline-primary btn-block"
                    type="submit"
                    value="Save"
                  />
                )}
              </form>
            </div>
            <br />
            {this.state.creado &&
              (this.state.id === "" ? (
                <Mensaje mensaje="Employee added" />
              ) : (
                <Mensaje mensaje="Employee updated" />
              ))}
          </div>
          <div className="col-md-9">
            <ListaEmpleados
              fetchEmpleados={this.fetchEmpleados}
              empleados={this.state.empleados}
              updateEmpleado={this.updateEmpleado}
              resultadoBuscador={this.resultadoBuscador}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Formulario;
