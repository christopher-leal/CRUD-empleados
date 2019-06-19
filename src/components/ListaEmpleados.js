import React, { Component } from "react";
import Mensaje from "./Mensaje";

class ListaEmpleados extends Component {
  state = { borrado: false, type: "", search: "", place: "" };
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
  checkState = () => {
    const { type, search, place } = this.state;
    const noValido =
      !type ||
      type == "Choose one" ||
      !search ||
      !place ||
      place == "Choose one";
    return noValido;
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
  clearFilter = () => {
    const { fetchEmpleados } = this.props;
    this.setState({
      type: "Choose one",
      place: "Choose one",
      search: ""
    });
    fetchEmpleados();
  };
  buscador = async e => {
    e.preventDefault();
    const { resultadoBuscador } = this.props;
    const respuestaFetch = await fetch("/buscador", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const empleados = await respuestaFetch.json();
    resultadoBuscador(empleados);
  };
  obtenerValores = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="table-responsive-sm">
        <div className="row mb-2">
          <div className="col-md-3">
            <h3>Employees</h3>
          </div>
          <div className="col-md-9">
            <form className="form-inline" onSubmit={this.buscador}>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <label className="input-group-text">Filter</label>
                </div>
                <select
                  value={this.state.type}
                  name="type"
                  className="custom-select"
                  onChange={this.obtenerValores}
                >
                  <option>Choose one</option>
                  <option value="name">Name</option>
                  <option value="last_name">Last name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
                <select
                  value={this.state.place}
                  name="place"
                  onChange={this.obtenerValores}
                  className="custom-select"
                >
                  <option>Choose one</option>
                  <option value="start">Start with</option>
                  <option value="sub">Contains</option>
                  <option value="end">End with</option>
                </select>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search employee"
                  name="search"
                  onChange={this.obtenerValores}
                  value={this.state.search}
                />
                <input
                  disabled={this.checkState()}
                  className="btn btn-outline-success btn-sm mr-2"
                  type="submit"
                  value="Search"
                />
              </div>
              <button
                onClick={this.clearFilter}
                className="btn btn-outline-primary btn-sm"
              >
                Clear filter
              </button>
            </form>
          </div>
        </div>
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
                      Update
                    </button>
                    <br />
                    <button
                      value={empleado.id}
                      className="btn btn-outline-danger btn-block btn-sm"
                      onClick={this.borrarEmpleado}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.borrado && (
          <Mensaje mensaje="Employee deleted!" clase="warning" />
        )}
      </div>
    );
  }
}

export default ListaEmpleados;
