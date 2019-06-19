import React, { Component } from "react";
import "./App.css";
import Formulario from "./components/Formulario";
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand text-white">Empleados Emkode</a>
        </nav>
        <div className="container mt-4">
          <Formulario />
        </div>
      </div>
    );
  }
}

export default App;
