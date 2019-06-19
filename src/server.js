const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const db = require("./config/database");

//configuracion de body-parser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//configuracion de la carpeta public
app.use(express.static(path.join(__dirname, "../public")));

//importacion de las rutas
app.use(require("./routes"));
db.authenticate()
  .then(() => {
    console.log("DB conectada");
  })
  .catch(err => {
    console.log(err);
  });
app.listen(3001, () => {
  console.log("servidor corriendo en el puerto 3001");
});
